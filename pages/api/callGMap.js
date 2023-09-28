const axios = require("axios");

export default function handler(req, res) {
  console.log(req.headers);
  if (
    req.headers.referer.includes("impactco2.fr") ||
    req.headers.referer.includes("develop--impactco2.netlify.app") ||
    req.headers.referer.includes("monimpacttransport.fr")
  ) {
    return axios
      .get(`https://maps.googleapis.com/maps/api/distancematrix/json?${req.rawQuery}&key=${process.env.GMAP_API_KEY}`)
      .then((resp) => ({
        statusCode: 200,
        body: JSON.stringify(resp.data),
      }));
  } else {
    return res.status(401).json(JSON.stringify("Unauthorized"));
  }
}
