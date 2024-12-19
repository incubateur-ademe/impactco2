import { useMemo } from 'react'
import { useDistanceStore } from 'src/providers/stores/distance'
import { useGlobalStore } from 'src/providers/stores/global'
import { useItineraireStore } from 'src/providers/stores/itineraire'
import { useTransportStore } from 'src/providers/stores/transport'
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
  const { language } = useGlobalStore()
  const distance = useDistanceStore()
  const itineraire = useItineraireStore()
  const transport = useTransportStore()

  const transportations = useMemo(() => {
    const { km } = distance
    const { displayAll, carpool } = type === 'distance' ? distance : itineraire
    const values = itineraries ? { ...itineraries } : null
    const roundTripFactor = itineraries && values && itineraire.roundTrip ? 2 : 1

    const allEquivalents =
      values || km
        ? deplacements
            // Carpool is managed after expansion, avion needs to be managed here
            .filter((equivalent) => equivalent.withCarpool || transport.modes.includes(equivalent.slug))
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
            .map((equivalent) => {
              const distance =
                (values && equivalent.type ? values[equivalent.type as DeplacementType] : km) * roundTripFactor
              return {
                ...equivalent,
                link: `/outils/transport/${equivalent.slug}`,
                name:
                  getNameWithoutSuffix(language, { ...equivalent, carpool: 0 }) +
                  (values ? ` - ${formatNumber(distance).toLocaleString()} km` : ''),
                value: computeECV(equivalent) * distance,
                usage: formatUsage(equivalent) * distance,
                onClick: () => track(tracking, 'Navigation equivalent', equivalent.slug),
              }
            })
            .flatMap((equivalent) => {
              const distance =
                (values && equivalent.type ? values[equivalent.type as DeplacementType] : km) * roundTripFactor

              const carpoolValue = equivalent.withCarpool && carpool[equivalent.slug] ? carpool[equivalent.slug] : 1
              return equivalent.withCarpool && transport.modes.find((mode) => mode.startsWith(`${equivalent.slug}+`))
                ? [
                    {
                      ...equivalent,
                      carpool: carpoolValue,
                      name:
                        getNameWithoutSuffix(language, { ...equivalent, carpool: carpoolValue }) +
                        (values ? ` - ${formatNumber(distance).toLocaleString()} km` : ''),
                      initialValue: equivalent.value,
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
                  return transport.modes.includes(`${slug}+1`)
                }
                // Without carpool, check slug
                return transport.modes.includes(equivalent.slug)
              }
              // Manage on top
              return true
            })
        : []

    const equivalents =
      displayAll || transport.comparisonMode === 'comparison'
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
  }, [transport, distance, itineraire, language, itineraries, type, tracking])

  return transportations
}
