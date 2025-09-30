import { useQuery } from '@tanstack/react-query'
import { Address } from 'types/address'

const layers = ['city', 'street', 'house']

export const searchAddress = async (search: string, limit?: number) => {
  const axios = (await import('axios')).default

  return axios
    .get<{
      features?: Address[]
    }>(
      `https://photon.komoot.io/api/?q=${search}${limit ? `&limit=${limit}` : ''}&${layers
        .map((layer) => `layer=${layer}`)
        .join('&')}&lang=fr&lat=46.227638&lon=2.213749&zoom=7&location_bias_scale=0.9`
    )
    .then((res) => {
      return res.data && res.data.features
        ? res.data.features.sort((a, b) => {
            if (a.properties.country === 'France' && b.properties.country !== 'France') {
              return -1
            }
            if (a.properties.country !== 'France' && b.properties.country === 'France') {
              return 1
            }
            return 0
          })
        : []
    })
}

export function useSuggestions(search: string, place?: string) {
  return useQuery({
    queryKey: ['search', search],
    queryFn: () => (!place && search && search.length > 2 ? searchAddress(search) : Promise.resolve([])),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}
