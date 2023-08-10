const axios = require("axios");

const fs = require("fs");
let rawdata = fs.readFileSync("src/data/categories/boisson.json");
let rawboissons = JSON.parse(rawdata);
let boissons = rawboissons.filter((e) => !!e?.Code_CIQUAL);
// console.log("boissons", boissons);

const AGRICULTURE_ID = 30;
// const TRANSFORMATION_ID = 31;
// const EMBALLAGE_ID = 32;
// const TRANSPORT_ID = 33;
// const SUPERMARCHE_ID = 34;
// const CONSOMMATION_ID = 35;

const ciquals = boissons.map((e) => e.Code_CIQUAL).join(",");
// console.log("ciquals", ciquals);

const remote_url = `https://data.ademe.fr/data-fair/api/v1/datasets/agribalyse-31-detail-par-etape/lines?size=${
  ciquals.length + 100
}&select=Code_CIQUAL%2CNom_du_Produit_en_Fran%C3%A7ais%2CChangement_climatique_-_Agriculture%2CChangement_climatique_-_Transformation%2CChangement_climatique_-_Emballage%2CChangement_climatique_-_Transport%2CChangement_climatique_-_Supermarch%C3%A9_et_distribution%2CChangement_climatique_-_Consommation%2CScore_unique_EF_-_Agriculture%2CScore_unique_EF_-_Transformation%2CScore_unique_EF_-_Emballage%2CScore_unique_EF_-_Transport%2CScore_unique_EF_-_Supermarch%C3%A9_et_distribution%2CScore_unique_EF_-_Consommation&Code_CIQUAL_in=${ciquals}`;

// console.log("remote_url ------------------------------- ", remote_url);

axios.get(remote_url).then((res) => {
  let remoteData = res.data;
  let finalResult = adaptEcv(remoteData.results);
  // console.dir(finalResult, { depth: null });
  // fs.writeFileSync("src/data/categories/boisson.json", JSON.stringify(finalResult, null, 2));
  return finalResult;
});

function sumValues(prefix = "", remote = {}, array = []) {
  let res = 0;
  array.forEach((acc) => {
    res += remote[`${prefix}${acc}`];
  });
  return res;
}

function upsert(array, element) {
  const i = array.findIndex((_element) => _element.id === element.id);
  if (i > -1) array[i] = element;
  else array.push(element);
}

const adaptEcv = (remotes) => {
  let newList = boissons.map((boisson) => {
    let remote = remotes.find((r) => r.Code_CIQUAL === boisson.Code_CIQUAL);
    if (!remote) {
      throw new Error("BUG! " + boisson.slug + " is not defined...");
    }
    let localBoisson = JSON.parse(JSON.stringify(boisson));
    console.log(localBoisson);

    const finalities = [
      "Agriculture",
      "Transformation",
      "Emballage",
      "Transport",
      "Supermarché_et_distribution",
      "Consommation",
    ];
    const finalC02 = sumValues("Changement_climatique_-_", remote, finalities);
    console.log("finalC02", finalC02);
    const finalEF = sumValues("Score_unique_EF_-_", remote, finalities);
    console.log("finalEF", finalEF);
    const delta = finalC02 / finalEF;
    console.log("delta", delta);

    let agriculture = localBoisson.ecv.find((e) => e.id === AGRICULTURE_ID) || {};
    agriculture.id = AGRICULTURE_ID;
    agriculture.name = "agriculture";
    agriculture.value = remote["Score_unique_EF_-_Agriculture"] * delta;
    console.log("agriculture", agriculture);
    upsert(localBoisson.ecv, agriculture);
    console.log("localBoisson.ecv", localBoisson.ecv);
    console.log("====================================================================================");
    console.log("\\");
  });
  return newList;
};
