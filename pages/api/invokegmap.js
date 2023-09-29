const axios = require("axios");

export default async function handler(req, res) {
  let host = req.headers.host;
  let query = req.query;
  let queryString = new URLSearchParams(query).toString();
  if (
    host.includes("impactco2.fr") ||
    host.includes("osc-fr1.scalingo.io") ||
    host.includes("--impactco2.netlify.app") ||
    host.includes("develop--impactco2.netlify.app") ||
    host.includes("monimpacttransport.fr")
  ) {
    const data = await axios
      .get(`https://maps.googleapis.com/maps/api/distancematrix/json?${queryString}&key=${process.env.GMAP_API_KEY}`)
      .then((resp) => ({
        statusCode: 200,
        body: resp.data,
      }));
    return res.status(200).json(data?.body || {});
  } else {
    return res.status(401).json(JSON.stringify("Unauthorized"));
  }
}
