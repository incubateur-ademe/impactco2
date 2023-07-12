import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import fruitsetlegumes from "data/categories/fruitsetlegumes.json";
import useLocalStorage from "use-local-storage";

const AGRICULTURE = 30;
// const TRANSFORMATION = 31;
// const EMBALLAGE = 32;
// const TRANSPORT = 33;
// const SUPERMARCHE = 34;
// const CONSOMMATION = 35;

export default function useFruitsEtLegumes() {
  const [fel, setFel] = useLocalStorage("ico2_fruitsetlegumes");

  let slugs = fruitsetlegumes.map((e) => e.name);
  let joined = '"' + slugs.join('" | "') + '"';
  let encoded = encodeURIComponent(joined);

  return useQuery(
    ["fruitsetlegumes"],
    () =>
      // axios.get(`https://data.ademe.fr/data-fair/api/v1/datasets/agribalyse-31-detail-par-etape/lines?select=Code_CIQUAL%2CNom_du_Produit_en_Fran%C3%A7ais%2CScore_unique_EF_-_Agriculture%2CScore_unique_EF_-_Transport%2CScore_unique_EF_-_Supermarch%C3%A9_et_distribution%2CScore_unique_EF_-_Consommation&size=200&q=%22carotte%22+%7C%C2%A0%22blette%22200`).then((res) => {
      fel ||
      axios
        .get(
          `https://data.ademe.fr/data-fair/api/v1/datasets/agribalyse-31-detail-par-etape/lines?select=Code_CIQUAL%2CNom_du_Produit_en_Fran%C3%A7ais%2CScore_unique_EF_-_Agriculture%2CScore_unique_EF_-_Transport%2CScore_unique_EF_-_Supermarch%C3%A9_et_distribution%2CScore_unique_EF_-_Consommation&size=600&q=${encoded}`
        )
        .then((res) => {
          let remoteData = res.data;
          console.log("remoteData", remoteData);
          let finalResult = adaptEcv(remoteData.results);
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

const adaptEcv = (remotes) => {
  console.log("remotes", remotes);
  let newList = fruitsetlegumes.map((fruit) => {
    let remote = remotes.find((r) => r.Code_CIQUAL === fruit.Code_CIQUAL);
    if (fruit.Code_CIQUAL === 20019) console.log("remote", remote);
    if (!remote) {
      console.warn(fruit.slug + " is not defined...");
    }
    let localFruit = JSON.parse(JSON.stringify(fruit));
    let agricultureEcv = localFruit.ecv.find((e) => e.id === AGRICULTURE);
    if (fruit.Code_CIQUAL === 20019) console.log("old value is " + agricultureEcv.value);
    agricultureEcv.value = remote["Score_unique_EF_-_Agriculture"];
    if (fruit.Code_CIQUAL === 20019) console.log("new value is " + agricultureEcv.value);
    if (fruit.Code_CIQUAL === 20019) console.log("localFruit", localFruit);
    if (fruit.Code_CIQUAL === 20019) console.log("---");
    if (fruit.Code_CIQUAL === 20019) console.log("");
    return localFruit;
  });
  console.log("newList", newList);
  return newList;
};
