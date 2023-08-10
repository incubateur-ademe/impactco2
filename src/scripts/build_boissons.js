const axios = require("axios");

const fs = require("fs");
let rawdata = fs.readFileSync("src/data/categories/boisson.json");
let rawboissons = JSON.parse(rawdata);
let boissons = rawboissons.filter((e) => !!e?.Code_CIQUAL);
// console.log("boissons", boissons);

// const AGRICULTURE_ID = 30;
// const EMBALLAGE_ID = 32;
// const TRANSPORT_ID = 33;
// const SUPERMARCHE_ID = 34;

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

const adaptEcv = (remotes) => {
  let newList = boissons.map((boisson) => {
    let remote = remotes.find((r) => r.Code_CIQUAL === boisson.Code_CIQUAL);
    if (!remote) {
      throw new Error("BUG! " + boisson.slug + " is not defined...");
    }
    let localBoisson = JSON.parse(JSON.stringify(boisson));
    console.log(localBoisson);
  });
  return newList;
};
