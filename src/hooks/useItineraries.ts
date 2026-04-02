import { useQuery } from '@tanstack/react-query'
import { callGMap } from 'src/serverFunctions/callGMap'
import { track } from 'utils/matomo'

export type Point = {
  latitude: number
  longitude: number
  city: string
  address: string
}

export default function useItineraries(
  start: Point | undefined,
  end: Point | undefined,
  tracking: string,
  trackOnce?: (event: string) => void
) {
  return useQuery({
    queryKey: [start || '', end || ''],
    queryFn: async () => {
      if (!start || !end) {
        return null
      }

      if (start.city && end.city) {
        track(`Transport ${tracking}`, 'Recherche', `${start.city}-${end.city}`)
        if (trackOnce) {
          trackOnce('Recherche')
        }
      }

      return callGMap({
        destinations: {
          latitude: start.latitude,
          longitude: start.longitude,
        },
        origins: {
          latitude: end.latitude,
          longitude: end.longitude,
        },
      })
    },
    enabled: start && end && !!start.latitude && !!end.latitude,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}
