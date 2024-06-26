import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { DeplacementType } from 'types/equivalent'
import { TransportSimulateur } from 'types/transport'
import { deplacements } from 'data/categories/deplacement'
import { getName } from 'utils/Equivalent/equivalent'
import { computeECV } from 'utils/computeECV'
import formatNumber from 'utils/formatNumber'
import formatUsage from 'utils/formatUsage'
import { track } from 'utils/matomo'
import { filterByDistance } from 'utils/transport'

// C'est un peu austère, déso
export default function useTransportations(
  tracking: string,
  type: TransportSimulateur,
  itineraries?: Record<DeplacementType, number> | null
) {
  const params = useParamContext()
  const t = useTranslations('transport')

  const transportations = useMemo(() => {
    const { km } = params.distance
    const { displayAll, carpool } = params[type]
    const allEquivalents =
      itineraries || km
        ? deplacements
            .filter((equivalent) => equivalent.category === 4)
            .filter((equivalent) =>
              itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km
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
                    slug: `${equivalent.slug}-${currentECV.subtitle}`,
                  }
                }
              }
              return equivalent
            })
            .map((equivalent) => ({
              ...equivalent,
              link: `/outils/transport/${equivalent.slug}`,
              name:
                getName(params.language, equivalent) +
                (itineraries
                  ? ` - ${formatNumber(
                      itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km
                    ).toLocaleString()} km`
                  : ''),
              value:
                computeECV(equivalent) *
                (itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km),
              usage:
                formatUsage(equivalent) *
                (itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km),
              onClick: () => track(tracking, 'Navigation equivalent', equivalent.slug),
            }))
            .flatMap((equivalent) =>
              equivalent.carpool
                ? [
                    {
                      ...equivalent,
                      name:
                        t('carpool') +
                        (itineraries
                          ? ` - ${formatNumber(
                              itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km
                            ).toLocaleString()} km`
                          : ''),
                      value: equivalent.value / (carpool + 1),
                      ecv: equivalent.ecv.map((ecv) => ({ ...ecv, value: ecv.value / (carpool + 1) })),
                      usage: equivalent.usage / (carpool + 1),
                    },
                    { ...equivalent, carpool: 0 },
                  ]
                : [equivalent]
            )
        : []

    const equivalents = displayAll
      ? allEquivalents
      : allEquivalents
          .filter((equivalent) => equivalent.default)
          .filter((equivalent) =>
            filterByDistance(
              equivalent.display,
              itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km
            )
          )

    return {
      hasMore: displayAll || allEquivalents.length > equivalents.length,
      equivalents,
    }
  }, [params, itineraries, type, tracking])

  return transportations
}
