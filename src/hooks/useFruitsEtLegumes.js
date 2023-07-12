import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import fruitsetlegumes from "data/categories/fruitsetlegumes.json";
import useLocalStorage from "use-local-storage";

export default function useFruitsEtLegumes() {
  const [fel, setFel] = useLocalStorage("ico2_fruitsetlegumes");

  let slugs = fruitsetlegumes.map((e) => e.slug);
  let joined = '"' + slugs.join('" | "') + '"';
  let encoded = encodeURIComponent(joined);

  return useQuery(
    ["fruitsetlegumes"],
    () =>
      // axios.get(`https://data.ademe.fr/data-fair/api/v1/datasets/agribalyse-31-detail-par-etape/lines?select=Code_CIQUAL%2CNom_du_Produit_en_Fran%C3%A7ais%2CScore_unique_EF_-_Agriculture%2CScore_unique_EF_-_Transport%2CScore_unique_EF_-_Supermarch%C3%A9_et_distribution%2CScore_unique_EF_-_Consommation&size=200&q=%22carotte%22+%7C%C2%A0%22blette%22200`).then((res) => {
      fel ||
      axios
        .get(
          `https://data.ademe.fr/data-fair/api/v1/datasets/agribalyse-31-detail-par-etape/lines?select=Code_CIQUAL%2CNom_du_Produit_en_Fran%C3%A7ais%2CScore_unique_EF_-_Agriculture%2CScore_unique_EF_-_Transport%2CScore_unique_EF_-_Supermarch%C3%A9_et_distribution%2CScore_unique_EF_-_Consommation&size=500&q=${encoded}`
        )
        .then((res) => {
          let remoteData = res.data;
          console.log("remoteData", remoteData);
          let finalResult = adaptEcv(remoteData);
          setFel(finalResult);
          return finalResult;
        }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
}

const adaptEcv = (remoteData) => {
  console.log("remoteData", remoteData);
  return fruitsetlegumes;
};
