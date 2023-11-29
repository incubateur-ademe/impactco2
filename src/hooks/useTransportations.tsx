import { useContext, useMemo } from 'react'
import { DeplacementEquivalent, DeplacementType } from 'types/equivalent'
import { computeECV } from 'utils/computeECV'
import formatName from 'utils/formatName'
import { formatNumber, formatUsage } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import Carpool from 'components/transport/Carpool'
import TransportContext from 'components/transport/TransportProvider'

const filterByDistance = (equivalent: DeplacementEquivalent, value: number) => {
  if (!equivalent.display || (!equivalent.display.min && !equivalent.display.max)) {
    return true
  }

  if (equivalent.display.max && equivalent.display.max < value) {
    return false
  }

  if (equivalent.display.min && equivalent.display.min > value) {
    return false
  }

  return true
}

// C'est un peu austère, déso
export default function useTransportations(itineraries: Record<DeplacementType, number> | undefined) {
  const { equivalents, categories } = useContext(DataContext)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: TODO
  const { km, displayAll, carpool } = useContext<{ km: number; displayAll: boolean; carpool: number }>(TransportContext)

  const transportations = useMemo(
    () =>
      itineraries || km
        ? equivalents
            .filter((equivalent) => equivalent.category === 4)
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
                  equivalent,
                  itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km
                )
            )
            .map((equivalent) => ({
              id: `${equivalent.id || equivalent.slug}`,
              title: `${formatName(equivalent.name, 1, true)}`,
              subtitle: formatName(
                equivalent?.ecvs
                  ? `(${equivalent?.ecvs?.find(
                      (ecv) =>
                        ecv.max >
                        (itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km)
                    )?.subtitle})`
                  : ((displayAll || equivalent.name === 'Voiture') && equivalent.subtitle
                      ? `(${equivalent.subtitle})`
                      : '') +
                      (itineraries
                        ? ` - ${formatNumber(
                            itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km
                          )} km`
                        : '')
              ),
              emoji: equivalent.emoji,
              secondEmoji: equivalent.secondEmoji,
              value:
                (computeECV(equivalent) *
                  (itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km)) /
                (equivalent.carpool && carpool ? carpool : 1),
              usage:
                (formatUsage(equivalent) *
                  (itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km)) /
                (equivalent.carpool && carpool ? carpool : 1),
              component: equivalent.carpool && <Carpool />,
              to: `/${categories.find((category) => category.id === equivalent.category)?.slug}/${equivalent.slug}`,
              onClick: () =>
                window?.please?.track(['trackEvent', 'Interaction', 'Navigation via graph categorie', equivalent.slug]),
            }))
            .sort((a, b) => (a.value > b.value ? 1 : -1))
        : [],
    [categories, equivalents, km, displayAll, carpool, itineraries]
  )

  return transportations
}
