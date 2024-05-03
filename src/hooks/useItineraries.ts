import { useQuery } from '@tanstack/react-query'
import axiosClient from 'utils/axios'
import { CallGMapDistances } from 'utils/gmaps'
import { track } from 'utils/matomo'

export type Point = {
  latitude: number
  longitude: number
  city: string
  address: string
}

export default function useItineraries(start: Point | undefined, end: Point | undefined, tracking: string) {
  const { data } = useQuery({
    queryKey: [start || '', end || ''],
    queryFn: () => {
      if (!start || !end) {
        return null
      }

      if (start.city && end.city) {
        // Not track when coming from iframe
        track(`Transport ${tracking}`, 'Recherche', `${start.city}-${end.city}`)
      }

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

  return data
}
