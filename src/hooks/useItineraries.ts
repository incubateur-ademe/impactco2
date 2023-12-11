import { useQuery } from '@tanstack/react-query'
import { CallGMapDistances } from 'pages/api/callGMap'
import axiosClient from 'utils/axios'
import { track } from 'utils/matomo'

export type Point = {
  latitude: number
  longitude: number
  city: string
}

export default function useItineraries(start: Point, end: Point, category: string) {
  const { data } = useQuery({
    queryKey: [start, end],
    queryFn: () => {
      track(`Transport ${category}`, 'Recherche', `${start.city}-${end.city}`)
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
        .then((res) => res.data)
    },
    enabled: !!(start.latitude && end.latitude),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  return data
}
