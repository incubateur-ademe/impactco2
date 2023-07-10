import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function removePropertiesThatDontStartsWith(obj, word) {
  let propsToDelete = [];
  for (let prop in obj) {
    if (!prop.startsWith(word)) {
      propsToDelete.push(prop);
    }
  }
  for (let propToDelete of propsToDelete) {
    delete obj[propToDelete];
  }
}

export default function useRulesLivraison() {
  return useQuery(
    ["rules"],
    () =>
      axios.get(`https://deploy-preview-1895--ecolab-data.netlify.app/co2-model.FR-lang.fr.json`).then((res) => {
        let obj = res.data;
        removePropertiesThatDontStartsWith(obj, "livraison");
        return obj;
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
}
