const axios = require("axios");

const fs = require("fs");
let rawdata = fs.readFileSync("src/data/categories/boisson.json");
let boissons = JSON.parse(rawdata);

const ciquals = boissons.map((e) => e.Code_CIQUAL).join(",");

const remote_url = `https://data.ademe.fr/data-fair/api/v1/datasets/agribalyse-31-detail-par-etape/lines?size=${
  boissons.length + 100
}&select=Code_CIQUAL%2CNom_du_Produit_en_Fran%C3%A7ais%2CChangement_climatique_-_Agriculture%2CChangement_climatique_-_Transformation%2CChangement_climatique_-_Emballage%2CChangement_climatique_-_Transport%2CChangement_climatique_-_Supermarch%C3%A9_et_distribution%2CChangement_climatique_-_Consommation%2CScore_unique_EF_-_Agriculture%2CScore_unique_EF_-_Transformation%2CScore_unique_EF_-_Emballage%2CScore_unique_EF_-_Transport%2CScore_unique_EF_-_Supermarch%C3%A9_et_distribution%2CScore_unique_EF_-_Consommation&Code_CIQUAL_in=${ciquals}`;

console.log("remote_url ------------------------------- ", remote_url);

axios.get(remote_url).then((res) => {
  let remoteData = res.data;
  let finalResult = adaptEcv(remoteData.results);
  console.dir(finalResult, { depth: null });
  fs.writeFileSync("src/data/categories/boisson.json", JSON.stringify(finalResult, null, 2));
  return finalResult;
});

const adaptEcv = (remotes) => {
  console.log("remotes", remotes);
  let newList = boissons.map((boisson) => {
    console.log(boisson);
  });
  return newList;
};
