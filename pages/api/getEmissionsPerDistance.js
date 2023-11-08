import { trackAPIRequest } from 'utils/middleware'
import transportations from './transportations.json'

const transportationsWithValues = transportations.filter((transportation) => transportation.values)

export default async function handler(req, res) {
  await trackAPIRequest(req, 'getEmissionsPerDistance', JSON.stringify(req.query))

  const queryObj = req.query

  const km = queryObj.km || 1
  const filter = queryObj.filter || (queryObj.transportations ? 'all' : 'smart')
  const activeTransportations = queryObj.transportations
    ? queryObj.transportations.split(',').map((id) => Number(id))
    : []

  const ignoreRadiativeForcing = !!queryObj.ignoreRadiativeForcing || false
  const fields = (queryObj.fields || '').split(',')

  const respObj = buildRespObj(activeTransportations, ignoreRadiativeForcing, filter, km, fields)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTION')
  return res.status(200).json(respObj || {})
}

function buildRespObj(activeTransportations, ignoreRadiativeForcing, filter, km, fields) {
  return (
    transportationsWithValues
      // Filter transportations via filter parameter
      .filter((transportation) =>
        filter === 'all'
          ? true
          : //Not set
            (!transportation.display.min && !transportation.display.max) ||
            //Only max
            (!transportation.display.min && transportation.display.max >= km) ||
            //Only min
            (!transportation.display.max && transportation.display.min <= km) ||
            //Both min and max
            (transportation.display.min <= km && transportation.display.max >= km)
      )
      // Filter transportations via transportations parameter
      .filter((transportation) =>
        !activeTransportations.length ? true : activeTransportations.includes(transportation.id)
      )
      // Calculate emissions
      .map((transportation) => {
        const value = ignoreRadiativeForcing
          ? transportation.values[0].value
          : transportation.values[0].uncertainty || transportation.values[0].value
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
        const response = {
          id: transportation.id,
          name: transportation.label.fr,
          emissions: transportation.emissions,
        }
        for (const field of fields) {
          response[field] = (transportation[field] && transportation[field].fr) || transportation[field]
        }
        return response
      })
  )
}
