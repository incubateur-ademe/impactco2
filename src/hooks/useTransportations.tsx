import { useMemo } from 'react'
import { DeplacementType } from 'types/equivalent'
import { TransportSimulateur } from 'types/transport'
import equivalents from 'data/categories/deplacement.json'
import { computeECV } from 'utils/computeECV'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import formatUsage from 'utils/formatUsage'
import { track } from 'utils/matomo'
import { filterByDistance } from 'utils/transport'
import useParamContext from 'components/providers/ParamProvider'
import Carpool from 'components/transport/Carpool'

// C'est un peu austère, déso
export default function useTransportations(
  tracking: string,
  type: TransportSimulateur,
  itineraries?: Record<DeplacementType, number> | null
) {
  const params = useParamContext()

  const transportations = useMemo(() => {
    const { km } = params.distance
    const { displayAll, carpool } = params[type]
    return itineraries || km
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
          .filter((transportation) => !transportation.contexted)
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
                  slug: `${equivalent.name} ${currentECV.subtitle}`.replace(/ /g, '').toLowerCase(),
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
            component: equivalent.carpool && <Carpool type={type} />,
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
      : []
  }, [params, itineraries, type, tracking])

  return transportations
}
