const axios = require("axios");
// const fruitsetlegumes = require('src/data/categories/fruitsetlegumes.json');

const fs = require("fs");
let rawdata = fs.readFileSync("src/data/categories/fruitsetlegumes.json");
let fruitsetlegumes = JSON.parse(rawdata);

const AGRICULTURE_ID = 30;
const TRANSPORT_ID = 31;
const EMBALLAGE_ID = 32;
const TRANSFORMATION_ID = 33;
const SUPERMARCHE_ID = 34;
const CONSOMMATION_ID = 35;

const ciquals = fruitsetlegumes.map((e) => e.Code_CIQUAL).join(",");
const remote_url = `https://data.ademe.fr/data-fair/api/v1/datasets/agribalyse-31-detail-par-etape/lines?size=100&select=Code_CIQUAL%2CNom_du_Produit_en_Fran%C3%A7ais%2CScore_unique_EF_-_Agriculture%2CScore_unique_EF_-_Transformation%2CScore_unique_EF_-_Emballage%2CScore_unique_EF_-_Transport%2CScore_unique_EF_-_Supermarch%C3%A9_et_distribution%2CScore_unique_EF_-_Consommation&Code_CIQUAL_in=${ciquals}`;

function upsert(array, element) {
  // (1)
  const i = array.findIndex((_element) => _element.id === element.id);
  if (i > -1) array[i] = element; // (2)
  else array.push(element);
}

console.log("remote_url", remote_url);

axios.get(remote_url).then((res) => {
  let remoteData = res.data;
  let finalResult = adaptEcv(remoteData.results);
  return finalResult;
});

const adaptEcv = (remotes) => {
  let newList = fruitsetlegumes.map((fruit) => {
    let remote = remotes.find((r) => r.Code_CIQUAL === fruit.Code_CIQUAL);
    if (fruit.Code_CIQUAL === 20019) console.log("remote", remote);
    if (!remote) {
      console.warn(fruit.slug + " is not defined...");
    }
    let localFruit = JSON.parse(JSON.stringify(fruit));

    let agriculture = localFruit.ecv.find((e) => e.id === AGRICULTURE_ID);
    agriculture.id = AGRICULTURE_ID;
    agriculture.value = remote["Score_unique_EF_-_Agriculture"];
    upsert(localFruit.ecv, agriculture);

    let transformation = localFruit.ecv.find((e) => e.id === TRANSFORMATION_ID) || {};
    transformation.id = TRANSFORMATION_ID;
    transformation.value = remote["Score_unique_EF_-_Transformation"];
    upsert(localFruit.ecv, transformation);

    let emballage = localFruit.ecv.find((e) => e.id === EMBALLAGE_ID) || {};
    emballage.id = EMBALLAGE_ID;
    emballage.value = remote["Score_unique_EF_-_Emballage"];
    upsert(localFruit.ecv, emballage);

    let transport = localFruit.ecv.find((e) => e.id === TRANSPORT_ID) || {};
    transport.id = TRANSPORT_ID;
    transport.value = remote["Score_unique_EF_-_Transport"];
    upsert(localFruit.ecv, transport);

    let supermarche = localFruit.ecv.find((e) => e.id === SUPERMARCHE_ID) || {};
    supermarche.id = SUPERMARCHE_ID;
    supermarche.value = remote["Score_unique_EF_-_Supermarché_et_distribution"];
    upsert(localFruit.ecv, supermarche);

    let consommation = localFruit.ecv.find((e) => e.id === CONSOMMATION_ID) || {};
    consommation.id = CONSOMMATION_ID;
    consommation.value = remote["Score_unique_EF_-_Consommation"];
    upsert(localFruit.ecv, supermarche);

    if (fruit.Code_CIQUAL === 20019) console.log("localFruit", localFruit);
    if (fruit.Code_CIQUAL === 20019) console.log("---");
    if (fruit.Code_CIQUAL === 20019) console.log("");
    return localFruit;
  });
  // console.log('newList', newList);
  return newList;
};
