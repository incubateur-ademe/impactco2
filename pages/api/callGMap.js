const axios = require("axios");

export default async function handler(req, res) {
  let query = req.query;
  let queryString = new URLSearchParams(query).toString();

  const data = await axios
    .get(`https://maps.googleapis.com/maps/api/distancematrix/json?${queryString}&key=${process.env.GMAP_API_KEY}`)
    .then((resp) => ({
      statusCode: 200,
      body: resp.data,
    }));
  return res.status(200).json(data?.body || {});
}
