const axios = require('axios')

exports.handler = function (event) {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?${event.rawQuery}&key=${process.env.GMAP_API_KEY}`
    )
    .then((res) => ({
      statusCode: 200,
      body: JSON.stringify(res.data),
    }))
}
