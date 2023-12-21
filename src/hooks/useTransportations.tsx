import { useContext, useMemo } from 'react'
import { DeplacementEquivalent, DeplacementType } from 'types/equivalent'
import { computeECV } from 'utils/computeECV'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import formatUsage from 'utils/formatUsage'
import { track } from 'utils/matomo'
import { filterByDistance } from 'utils/transport'
import DataContext from 'components/providers/DataProvider'
import Carpool from 'components/transport/Carpool'
import TransportContext from 'components/transport/TransportProvider'

// C'est un peu austère, déso
export default function useTransportations(tracking: string, itineraries?: Record<DeplacementType, number>) {
  const { equivalents } = useContext(DataContext)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: TODO
  const { km, displayAll, carpool } = useContext<{ km: number; displayAll: boolean; carpool: number }>(TransportContext)

  const transportations = useMemo(
    () =>
      itineraries || km
        ? equivalents
            .filter((equivalent) => equivalent.category === 4)
            .filter((equivalent) => equivalent.slug !== 'avion')
            .map((equivalent) => equivalent as DeplacementEquivalent)
            .filter((equivalent) =>
              itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km
            )
            .filter((equivalent) => equivalent.default || displayAll)
            .reduce(
              (acc, cur) =>
                cur.carpool ? [...acc, cur, { ...cur, id: cur.slug + '_nocarpool', carpool: false }] : [...acc, cur],
              [] as DeplacementEquivalent[]
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
