import axios from 'axios'
import countries from './countries.json'

export default async function handler(req, res) {
  let query = req.query
  let queryString = new URLSearchParams(query).toString()
  let country = countries[req.headers['x-country']]
  if (!country) {
    country = countries['FR']
  }

  const data = await axios
    .get(`https://photon.komoot.io/api/?q=${queryString}&lat=${country[0]}&lon=${country[1]}&lang=fr`)
    .then((resp) => ({
      statusCode: 200,
      body: resp.data,
    }))
  return res.status(200).json(data?.body || {})
}
