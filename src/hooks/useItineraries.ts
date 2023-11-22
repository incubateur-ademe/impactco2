import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { CallGMapResponse } from 'pages/api/callGMap'

export type Point = {
  latitude: number
  longitude: number
}

export default function useItineraries(start: Point, end: Point, mode?: 'driving' | 'walking' | 'driving') {
  const { data } = useQuery({
    queryKey: [start, end, mode],
    queryFn: () =>
      axios
        .post<CallGMapResponse>('/api/callGMap', {
          destinations: start,
          origins: end,
          mode,
        })
        .then((res) => res.data),
    enabled: !!(start.latitude && end.latitude),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  return data
}
