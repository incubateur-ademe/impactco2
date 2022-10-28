import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useRules() {
  return useQuery(
    ['rules'],
    () =>
      axios
        .get(
          `https://deploy-preview-1503--ecolab-data.netlify.app/usage-num%C3%A9rique.json`
        )
        .then((res) => res.data),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  )
}
