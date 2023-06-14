import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useRulesLivraison() {
  return useQuery(
    ['rules'],
    () =>
      axios
        .get(
          `https://deploy-preview-1895--ecolab-data.netlify.app/co2-model.FR-lang.fr.json`
        )
        .then((res) => res.data),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  )
}
