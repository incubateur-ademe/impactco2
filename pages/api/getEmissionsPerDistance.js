import { trackAPIRequest } from 'utils/middleware'
import { computeTransportEmission } from './v1/transport'

export default async function handler(req, res) {
  await trackAPIRequest(req, 'getEmissionsPerDistance', JSON.stringify(req.query))

  const queryObj = req.query

  const km = queryObj.km || 1
  const filter = queryObj.filter || (queryObj.transportations ? 'all' : 'smart')
  const activeTransportations = queryObj.transportations
    ? queryObj.transportations.split(',').map((id) => Number(id))
    : undefined

  const ignoreRadiativeForcing = !!queryObj.ignoreRadiativeForcing || false
  const fields = (queryObj.fields || '').split(',')

  console.log(activeTransportations, ignoreRadiativeForcing, filter)
  const respObj = computeTransportEmission(km, activeTransportations, ignoreRadiativeForcing, filter === 'all')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTION')
  return res.status(200).json(
    respObj
      ? // Set response according to field parameter
        respObj.map((transportation) => {
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
      : {}
  )
}
