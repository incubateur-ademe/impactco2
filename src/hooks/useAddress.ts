import { useQuery } from '@tanstack/react-query'
import axiosClient from 'utils/axios'

export const searchAddress = (search: string, limit?: number) =>
  axiosClient
    .post('/api/search', {
      search,
      limit,
    })
    .then((res) => res.data.features)

export function useSuggestions(search: string, focus: boolean) {
  return useQuery({
    queryKey: ['search', search],
    queryFn: () => (search && search.length > 2 ? searchAddress(search) : Promise.resolve([])),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: focus,
  })
}
