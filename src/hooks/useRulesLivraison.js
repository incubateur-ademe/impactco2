import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useRulesLivraison() {
  let res = useQuery(
    ["rulesLivraison"],
    () =>
      axios.get(`https://deploy-preview-1895--ecolab-data.netlify.app/co2-model.FR-lang.fr.json`).then((res) => {
        removePropsNotStartingWith(res.data, "livraison colis");
        return res.data;
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
  return res;
}

function removePropsNotStartingWith(obj, word) {
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
