const axios = require("axios");
const countries = require("./countries.json");

export default async function handler(req, res) {
  let host = req.headers.host;
  let query = req.query;
  let queryString = new URLSearchParams(query).toString();
  let country = countries[req.headers["x-country"]];
  if (!country) {
    country = countries["FR"];
  }
  if (
    host.includes("impactco2.fr") ||
    host.includes("osc-fr1.scalingo.io") ||
    host.includes("--impactco2.netlify.app") ||
    host.includes("develop--impactco2.netlify.app") ||
    host.includes("monimpacttransport.fr")
  ) {
    const data = await axios
      .get(`https://photon.komoot.io/api/?q=${queryString}&lat=${country[0]}&lon=${country[1]}&lang=fr`)
      .then((resp) => ({
        statusCode: 200,
        body: resp.data,
      }));
    return res.status(200).json(data?.body || {});
  } else {
    return res.status(401).json(JSON.stringify("Unauthorized"));
  }
}
