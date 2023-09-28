const axios = require("axios");

exports.handler = function (event) {
  console.log(event.headers);
  if (
    event.headers.referer.includes("impactco2.fr") ||
    event.headers.referer.includes("deploy-preview-429--impactco2.netlify.app") ||
    event.headers.referer.includes("develop--impactco2.netlify.app") ||
    event.headers.referer.includes("monimpacttransport.fr")
  ) {
    return axios
      .get(`https://maps.googleapis.com/maps/api/distancematrix/json?${event.rawQuery}&key=${process.env.GMAP_API_KEY}`)
      .then((res) => ({
        statusCode: 200,
        body: JSON.stringify(res.data),
      }));
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify("Unauthorized"),
    };
  }
};
