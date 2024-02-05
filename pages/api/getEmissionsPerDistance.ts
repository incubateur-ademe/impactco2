import { NextApiRequest, NextApiResponse } from 'next'
import { trackAPIRequest } from 'utils/middleware'
import { computeTransportEmission } from './v1/transport'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await trackAPIRequest(req, 'getEmissionsPerDistance', JSON.stringify(req.query))

  const queryObj = req.query

  const km: number = queryObj.km ? Number(queryObj.km) : 1
  const filter = queryObj.filter || (queryObj.transportations ? 'all' : 'smart')

  const activeTransportations =
    queryObj.transportations && typeof queryObj.transportations === 'string'
      ? queryObj.transportations.split(',').map((id: string) => Number(id))
      : undefined

  const ignoreRadiativeForcing = !!queryObj.ignoreRadiativeForcing || false
  const fields = typeof queryObj.fields === 'string' ? queryObj.fields.split(',') : []

  const respObj = computeTransportEmission(
    km,
    activeTransportations,
    ignoreRadiativeForcing,
    !queryObj.km ? true : filter === 'all'
  )
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTION')
  return res.status(200).json(
    respObj
      ? // Set response according to field parameter
        respObj.map((transportation) => {
          let response = {
            id: transportation.id,
            name: `${transportation.name}${transportation.subtitle ? ` (${transportation.subtitle})` : ''}`,
            emissions: transportation.emissions,
          }
          for (const field of fields) {
            response = { ...response, [field]: transportation[field as keyof typeof transportation] }
          }
          return response
        })
      : {}
  )
}
