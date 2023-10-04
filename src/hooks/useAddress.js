import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useSuggestions(search, focus) {
  return useQuery(
    ["search", search],
    () =>
      search && search.length > 2
        ? // API for now
          // axios.get(`https://impactco2.fr/.netlify/functions/callGMapSearch?${search}`).then((res) => res.data.features)
          axios.get(`/api/callGMapSearch?${search}`).then((res) => res.data.features)
        : Promise.resolve([]),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      enabled: focus,
    }
  );
}
export function usePosition(position) {
  return useQuery(
    ["position", position?.timestamp],
    () =>
      axios
        .get(
          `https://api-adresse.data.gouv.fr/reverse/?lon=${position.coords.longitude}&lat=${position.coords.latitude}`
        )
        .then((res) => res.data),
    {
      enabled: position ? true : false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
}
