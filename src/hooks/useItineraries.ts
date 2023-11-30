import { useQuery } from '@tanstack/react-query'
import { CallGMapDistances } from 'pages/api/callGMap'
import axiosClient from 'utils/axios'

export type Point = {
  latitude: number
  longitude: number
}

export default function useItineraries(start: Point, end: Point) {
  const { data } = useQuery({
    queryKey: [start, end],
    queryFn: () =>
      axiosClient
        .post<CallGMapDistances>('/api/callGMap', {
          destinations: start,
          origins: end,
        })
        .then((res) => res.data),
    enabled: !!(start.latitude && end.latitude),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  return data
}
