const axios = require("axios");

var MatomoTracker = require("matomo-tracker");

var matomo = new MatomoTracker(156, "https://stats.data.gouv.fr/matomo.php");

var transportations = require("./transportations.json");

export default async function handler(req, res) {
  let host = req.headers.host;
  let queryObj = req.query;
  if (
    host.includes("impactco2.fr") ||
    host.includes("osc-fr1.scalingo.io") ||
    host.includes("--impactco2.netlify.app") ||
    host.includes("monimpacttransport.fr")
  ) {
    trackMatomoOnce(queryObj.km);
    trackMatomoTwice(queryObj.km);

    const km = queryObj.km || 1;
    const filter = queryObj.filter || (queryObj.transportations ? "all" : "smart");
    const activeTransportations = queryObj.transportations
      ? queryObj.transportations.split(",").map((id) => Number(id))
      : [];

    const ignoreRadiativeForcing = queryObj.ignoreRadiativeForcing || false;
    const fields = (queryObj.fields || "").split(",");

    const respObj = buildRespObj(transportations, activeTransportations, ignoreRadiativeForcing, filter, km, fields);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTION");
    return res.status(200).json(respObj || {});
  } else {
    return res.status(401).json(JSON.stringify("Unauthorized"));
  }
}

function trackMatomoOnce(km) {
  matomo.track(`https://api.impactco2.fr/beta/getEmissionsPerDistance?km=${km}`);
}
async function trackMatomoTwice(km) {
  const genRanHex = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");

  const id = genRanHex(16);
  const rand = genRanHex(16);

  await axios
    .post(
      `https://stats.data.gouv.fr/matomo.php?idsite=156&rec=1&_id=${id}&rand=${rand}&url=https%3A%2F%2Fapi.impactco2.fr%2Fbeta%2FgetEmissionsPerDistance%3Fkm%3D${km}`
    )
    .then(() => {
      console.log("tracked successfully");
    })
    .catch((error) => {
      console.log("tracked failed", error);
    });
}
function buildRespObj(transportations, activeTransportations, ignoreRadiativeForcing, filter, km, fields) {
  return (
    transportations
      // Remove transportations without data
      .filter((transportation) => transportation.values)
      // Filter transportations via filter parameter
      .filter((transportation) =>
        filter === "all"
          ? true
          : //Not set
            ((!transportation.display.min && !transportation.display.max) ||
              //Only max
              (!transportation.display.min && transportation.display.max >= km) ||
              //Only min
              (!transportation.display.max && transportation.display.min <= km) ||
              //Both min and max
              (transportation.display.min <= km && transportation.display.max >= km)) &&
            true
      )
      // Filter transportations via transportations parameter
      .filter((transportation) =>
        !activeTransportations.length ? true : activeTransportations.includes(transportation.id)
      )
      // Calculate emissions
      .map((transportation) => {
        const value = ignoreRadiativeForcing
          ? transportation.values[0].value
          : transportation.values[0].uncertainty || transportation.values[0].value;
        return {
          ...transportation,
          emissions: {
            gco2e: value * km,
            kgco2e: (value * km) / 1000,
            tco2e: (value * km) / 1000000,
          },
        };
      })
      // Set response according to field parameter
      .map((transportation) => {
        let response = {
          id: transportation.id,
          name: transportation.label.fr,
          emissions: transportation.emissions,
        };
        for (let field of fields) {
          response[field] = (transportation[field] && transportation[field].fr) || transportation[field];
        }
        return response;
      })
  );
}
