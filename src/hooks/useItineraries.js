import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useItinerary(start, end, mode) {
  return useQuery(
    ['car', start, end, mode],
    () =>
      axios
        .get(
          `https://monimpacttransport.fr/.netlify/functions/callGMap/?destinations=${start.latitude}%2C${start.longitude}&origins=${end.latitude}%2C${end.longitude}&mode=${mode}`
        )
        .then((res) => res.data.rows),
    {
      enabled: start && end && mode ? true : false,
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  )
}
