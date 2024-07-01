import { useQuery } from '@tanstack/react-query'
import { CallGMapDistances } from 'utils/gmaps'
import { track } from 'utils/matomo'

export type Point = {
  latitude: number
  longitude: number
  city: string
  address: string
}

export default function useItineraries(start: Point | undefined, end: Point | undefined, tracking: string) {
  return useQuery({
    queryKey: [start || '', end || ''],
    queryFn: async () => {
      if (!start || !end) {
        return null
      }

      if (start.city && end.city) {
        track(`Transport ${tracking}`, 'Recherche', `${start.city}-${end.city}`)
      }

      const axiosClient = (await import('utils/axios')).default
      return axiosClient
        .post<CallGMapDistances>('/api/callGMap', {
          destinations: {
            latitude: start.latitude,
            longitude: start.longitude,
          },
          origins: {
            latitude: end.latitude,
            longitude: end.longitude,
          },
        })
        .then((res) => {
          return res.data
        })
    },
    enabled: start && end && !!start.latitude && !!end.latitude,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}
