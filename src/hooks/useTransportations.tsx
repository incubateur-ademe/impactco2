import { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { DeplacementType } from 'types/equivalent'
import { TransportSimulateur } from 'types/transport'
import { deplacements } from 'data/categories/deplacement'
import { getNameWithoutSuffix } from 'utils/Equivalent/equivalent'
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

  const transportations = useMemo(() => {
    const { km } = params.distance
    const { displayAll, carpool } = params[type]
    const allEquivalents =
      itineraries || km
        ? deplacements
            .filter((equivalent) => params.transport.modes.includes(equivalent.slug))
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
                getNameWithoutSuffix(params.language, { ...equivalent, carpool: 0 }) +
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
            .flatMap((equivalent) => {
              const carpoolValue = equivalent.withCarpool && carpool[equivalent.slug] ? carpool[equivalent.slug] : 1
              return equivalent.withCarpool
                ? [
                    {
                      ...equivalent,
                      carpool: carpoolValue,
                      name:
                        getNameWithoutSuffix(params.language, { ...equivalent, carpool: carpoolValue }) +
                        (itineraries
                          ? ` - ${formatNumber(
                              itineraries && equivalent.type ? itineraries[equivalent.type as DeplacementType] : km
                            ).toLocaleString()} km`
                          : ''),
                      initialValue: equivalent.value / 2,
                      value: equivalent.value / (carpoolValue + 1),
                      ecv: equivalent.ecv.map((ecv) => ({ ...ecv, value: ecv.value / (carpoolValue + 1) })),
                      usage: equivalent.usage / (carpoolValue + 1),
                      link: `${equivalent.link}+${carpoolValue}`,
                    },
                    { ...equivalent, carpool: 0 },
                  ]
                : [equivalent]
            })
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
      hasMore: (displayAll || allEquivalents.length > equivalents.length) && equivalents.length !== 0,
      equivalents: equivalents.length === 0 ? allEquivalents : equivalents,
    }
  }, [params, itineraries, type, tracking])

  return transportations
}
