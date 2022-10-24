const axios = require('axios')

const countries = require('./countries.json')

exports.handler = function (event) {
  const country = countries[event.headers['x-country']]
  console.log(
    `https://photon.komoot.io/api/?q=${event.rawQuery}&lat=${country[0]}&lon=${country[1]}&lang=fr`
  )
  return axios
    .get(
      `https://photon.komoot.io/api/?q=${event.rawQuery}&lat=${country[0]}&lon=${country[1]}&lang=fr`
    )
    .then((res) => ({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTION',
      },
      body: JSON.stringify(res.data),
    }))
}
