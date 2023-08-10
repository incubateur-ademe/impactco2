const axios = require("axios");

const fs = require("fs");
let rawdata = fs.readFileSync("src/data/categories/boisson.json");
let rawboissons = JSON.parse(rawdata);
let boissons = rawboissons.filter((e) => !!e?.Code_CIQUAL);

let boissons_hors_calcul = rawboissons.filter((e) => !e?.Code_CIQUAL);

const AGRICULTURE_ID = 30;
const TRANSFORMATION_ID = 31;
const EMBALLAGE_ID = 32;
const TRANSPORT_ID = 33;
const SUPERMARCHE_ID = 34;
const CONSOMMATION_ID = 35;

const ciquals = boissons.map((e) => e.Code_CIQUAL).join(",");

const remote_url = `https://data.ademe.fr/data-fair/api/v1/datasets/agribalyse-31-detail-par-etape/lines?size=${
  ciquals.length + 100
}&select=Code_CIQUAL%2CNom_du_Produit_en_Fran%C3%A7ais%2CChangement_climatique_-_Agriculture%2CChangement_climatique_-_Transformation%2CChangement_climatique_-_Emballage%2CChangement_climatique_-_Transport%2CChangement_climatique_-_Supermarch%C3%A9_et_distribution%2CChangement_climatique_-_Consommation%2CScore_unique_EF_-_Agriculture%2CScore_unique_EF_-_Transformation%2CScore_unique_EF_-_Emballage%2CScore_unique_EF_-_Transport%2CScore_unique_EF_-_Supermarch%C3%A9_et_distribution%2CScore_unique_EF_-_Consommation&Code_CIQUAL_in=${ciquals}`;

console.log("remote_url ------------------------------- ", remote_url);

axios.get(remote_url).then((res) => {
  let remoteData = res.data;
  let finalResult = adaptEcv(remoteData.results);
  console.dir(finalResult, { depth: null });
  let mergedArrays = [...boissons_hors_calcul, ...finalResult];
  fs.writeFileSync("src/data/categories/boisson.json", JSON.stringify(mergedArrays, null, 2));
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

    const finalities = [
      "Agriculture",
      "Transformation",
      "Emballage",
      "Transport",
      "Supermarché_et_distribution",
      "Consommation",
    ];
    const finalC02 = sumValues("Changement_climatique_-_", remote, finalities);
    const finalEF = sumValues("Score_unique_EF_-_", remote, finalities);
    const delta = finalC02 / finalEF;

    let agriculture = localBoisson.ecv.find((e) => e.id === AGRICULTURE_ID) || {};
    agriculture.id = AGRICULTURE_ID;
    agriculture.name = "agriculture";
    agriculture.value = remote["Score_unique_EF_-_Agriculture"] * delta;
    upsert(localBoisson.ecv, agriculture);

    let transformation = localBoisson.ecv.find((e) => e.id === TRANSFORMATION_ID) || {};
    transformation.id = TRANSFORMATION_ID;
    transformation.name = "transformation";
    transformation.value = remote["Score_unique_EF_-_Transformation"] * delta;
    upsert(localBoisson.ecv, transformation);

    let emballage = localBoisson.ecv.find((e) => e.id === EMBALLAGE_ID) || {};
    emballage.id = EMBALLAGE_ID;
    emballage.name = "emballage";
    emballage.value = remote["Score_unique_EF_-_Emballage"] * delta;
    upsert(localBoisson.ecv, emballage);

    let transport = localBoisson.ecv.find((e) => e.id === TRANSPORT_ID) || {};
    transport.id = TRANSPORT_ID;
    transport.name = "transport";
    transport.value = remote["Score_unique_EF_-_Transport"] * delta;
    upsert(localBoisson.ecv, transport);

    let supermarche = localBoisson.ecv.find((e) => e.id === SUPERMARCHE_ID) || {};
    supermarche.id = SUPERMARCHE_ID;
    supermarche.name = "supermarche";
    supermarche.value = remote["Score_unique_EF_-_Supermarché_et_distribution"] * delta;
    upsert(localBoisson.ecv, supermarche);

    let consommation = localBoisson.ecv.find((e) => e.id === CONSOMMATION_ID) || {};
    consommation.id = CONSOMMATION_ID;
    consommation.name = "consommation";
    consommation.value = remote["Score_unique_EF_-_Consommation"] * delta;
    upsert(localBoisson.ecv, consommation);

    localBoisson.ecv = localBoisson.ecv.filter((e) => e.value !== 0);

    return localBoisson;
  });
  return newList;
};
