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
    const values = itineraries ? { ...itineraries } : null
    if (itineraries && values && params.itineraire.roundTrip) {
      //@ts-expect-error: key is managed via itineraries
      Object.entries(values).forEach(([key, value]) => (values[key] = value * 2))
    }

    const allEquivalents =
      values || km
        ? deplacements
            // Carpool is managed after expansion, avion needs to be managed here
            .filter((equivalent) => equivalent.withCarpool || params.transport.modes.includes(equivalent.slug))
            .filter((equivalent) => (values && equivalent.type ? values[equivalent.type as DeplacementType] : km))
            .map((equivalent) => {
              if ('ecvs' in equivalent && equivalent.ecvs) {
                const distance = values && equivalent.type ? values[equivalent.type as DeplacementType] : km
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
                (values
                  ? ` - ${formatNumber(
                      values && equivalent.type ? values[equivalent.type as DeplacementType] : km
                    ).toLocaleString()} km`
                  : ''),
              value:
                computeECV(equivalent) * (values && equivalent.type ? values[equivalent.type as DeplacementType] : km),
              usage:
                formatUsage(equivalent) * (values && equivalent.type ? values[equivalent.type as DeplacementType] : km),
              onClick: () => track(tracking, 'Navigation equivalent', equivalent.slug),
            }))
            .flatMap((equivalent) => {
              const carpoolValue = equivalent.withCarpool && carpool[equivalent.slug] ? carpool[equivalent.slug] : 1
              return equivalent.withCarpool &&
                params.transport.modes.find((mode) => mode.startsWith(`${equivalent.slug}+`))
                ? [
                    {
                      ...equivalent,
                      carpool: carpoolValue,
                      name:
                        getNameWithoutSuffix(params.language, { ...equivalent, carpool: carpoolValue }) +
                        (values
                          ? ` - ${formatNumber(
                              values && equivalent.type ? values[equivalent.type as DeplacementType] : km
                            ).toLocaleString()} km`
                          : ''),
                      initialValue: equivalent.value / 2,
                      value: equivalent.value / (carpoolValue + 1),
                      ecv: equivalent.ecv.map((ecv) => ({ ...ecv, value: ecv.value / (carpoolValue + 1) })),
                      usage: equivalent.usage / (carpoolValue + 1),
                      link: `${equivalent.link}+${carpoolValue}`,
                    },
                    equivalent,
                  ]
                : [equivalent]
            })
            .filter((equivalent) => {
              if (equivalent.withCarpool) {
                // Carpool case, check slug+1
                if ('carpool' in equivalent && equivalent.carpool) {
                  const [slug] = equivalent.slug.split('+')
                  return params.transport.modes.includes(`${slug}+1`)
                }
                // Without carpool, check slug
                return params.transport.modes.includes(equivalent.slug)
              }
              // Manage on top
              return true
            })
        : []

    const equivalents =
      displayAll || params.transport.comparisonMode === 'comparison'
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
