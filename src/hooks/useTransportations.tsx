import { useContext, useMemo } from 'react'
import { DeplacementType } from 'types/equivalent'
import equivalents from 'data/categories/deplacement.json'
import { computeECV } from 'utils/computeECV'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import formatUsage from 'utils/formatUsage'
import { track } from 'utils/matomo'
import { filterByDistance } from 'utils/transport'
import Carpool from 'components/transport/Carpool'
import TransportContext from 'components/transport/TransportProvider'

// C'est un peu austère, déso
export default function useTransportations(tracking: string, itineraries?: Record<DeplacementType, number>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: TODO
  const { km, displayAll, carpool } = useContext<{ km: number; displayAll: boolean; carpool: number }>(TransportContext)

  const transportations = useMemo(
    () =>
      itineraries || km
        ? equivalents
            .filter((equivalent) => equivalent.category === 4)
            .filter((equivalent) =>
              itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km
            )
            .filter((equivalent) => equivalent.default || displayAll)
            .flatMap((equivalent) =>
              equivalent.carpool ? [equivalent, { ...equivalent, carpool: false, id: -equivalent.id }] : [equivalent]
            )
            .filter((equivalent) => carpool || !equivalent.carpool)
            .filter(
              (equivalent) =>
                displayAll ||
                filterByDistance(
                  equivalent.display,
                  itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km
                )
            )
            .map((equivalent) => {
              if ('ecvs' in equivalent && equivalent.ecvs) {
                const distance = itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km
                const currentECV = equivalent.ecvs.find((value) =>
                  value.display.max ? value.display.max >= distance : true
                )
                if (currentECV) {
                  return {
                    ...equivalent,
                    ...currentECV,
                    slug: `${equivalent.name} ${currentECV.subtitle}`.replaceAll(' ', '').toLowerCase(),
                  }
                }
              }
              return equivalent
            })
            .map((equivalent) => ({
              ...equivalent,
              title: formatName(equivalent.name, 1, true),
              subtitle:
                formatName(equivalent.subtitle ? `(${equivalent.subtitle})` : '') +
                (itineraries
                  ? ` - ${formatNumber(
                      itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km
                    )} km`
                  : ''),
              component: equivalent.carpool && <Carpool />,
              value:
                (computeECV(equivalent) *
                  (itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km)) /
                (equivalent.carpool && carpool ? carpool : 1),
              usage:
                (formatUsage(equivalent) *
                  (itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km)) /
                (equivalent.carpool && carpool ? carpool : 1),
              onClick: () => track(tracking, 'Navigation equivalent', equivalent.slug),
            }))
        : [],
    [equivalents, km, displayAll, carpool, itineraries, tracking]
  )

  return transportations
}
