import { useQuery } from '@tanstack/react-query'
import axiosClient from 'utils/axios'

export function useSuggestions(search, focus) {
  return useQuery({
    queryKey: ['search', search],
    queryFn: () =>
      search && search.length > 2
        ? // API for now
          // axios.get(`https://impactco2.fr/.netlify/functions/callGMapSearch?${search}`).then((res) => res.data.features)
          axiosClient.get(`/api/callGMapSearch?${search}`).then((res) => res.data.features)
        : Promise.resolve([]),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: focus,
  })
}
export function usePosition(position) {
  return useQuery(
    ['position', position?.timestamp],
    () =>
      axiosClient
        .get(
          `https://api-adresse.data.gouv.fr/reverse/?lon=${position.coords.longitude}&lat=${position.coords.latitude}`
        )
        .then((res) => res.data),
    {
      enabled: position ? true : false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  )
}
