const axios = require('axios')

var MatomoTracker = require('matomo-tracker')

var matomo = new MatomoTracker(155, 'https://stats.data.gouv.fr/matomo.php')

var transportations = require('./data/transportations.json')

exports.handler = async function (event) {
  matomo.track(
    `https://api.impactco2.fr/beta/getEmissionsPerDistance?km=${event.queryStringParameters.km}`
  )

  const km = event.queryStringParameters.km || 1

  const genRanHex = (size) =>
    [...Array(size)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('')

  const id = genRanHex(16)
  const rand = genRanHex(16)

  await axios
    .post(
      `https://stats.data.gouv.fr/matomo.php?idsite=156&rec=1&_id=${id}&rand=${rand}&url=https%3A%2F%2Fapi.impactco2.fr%2Fbeta%2FgetEmissionsPerDistance%3Fkm%3D${km}`
    )
    .then((response) => {
      console.log('tracked successfully')
    })
    .catch((error) => {
      console.log('tracked failed', error)
    })

  const filter =
    event.queryStringParameters.filter ||
    (event.queryStringParameters.transportations ? 'all' : 'smart')
  const activeTransportations = event.queryStringParameters.transportations
    ? event.queryStringParameters.transportations
        .split(',')
        .map((id) => Number(id))
    : []

  const ignoreRadiativeForcing =
    event.queryStringParameters.ignoreRadiativeForcing || false
  const fields = (event.queryStringParameters.fields || '').split(',')

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTION',
    },
    body: JSON.stringify(
      transportations
        // Remove transportations without data
        .filter((transportation) => transportation.values)
        // Filter transportations via filter parameter
        .filter((transportation) =>
          filter === 'all'
            ? true
            : //Not set
              ((!transportation.display.min && !transportation.display.max) ||
                //Only max
                (!transportation.display.min &&
                  transportation.display.max >= km) ||
                //Only min
                (!transportation.display.max &&
                  transportation.display.min <= km) ||
                //Both min and max
                (transportation.display.min <= km &&
                  transportation.display.max >= km)) &&
              true
        )
        // Filter transportations via transportations parameter
        .filter((transportation) =>
          !activeTransportations.length
            ? true
            : activeTransportations.includes(transportation.id)
        )
        // Calculate emissions
        .map((transportation) => {
          const value = ignoreRadiativeForcing
            ? transportation.values[0].value
            : transportation.values[0].uncertainty ||
              transportation.values[0].value
          return {
            ...transportation,
            emissions: {
              gco2e: value * km,
              kgco2e: (value * km) / 1000,
              tco2e: (value * km) / 1000000,
            },
          }
        })
        // Set response according to field parameter
        .map((transportation) => {
          let response = {
            id: transportation.id,
            name: transportation.label.fr,
            emissions: transportation.emissions,
          }
          for (let field of fields) {
            response[field] =
              (transportation[field] && transportation[field].fr) ||
              transportation[field]
          }
          return response
        })
    ),
  }
}
