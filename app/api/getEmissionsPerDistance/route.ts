import { NextRequest, NextResponse } from 'next/server'
import { trackAPIRequest } from 'utils/middleware'
import { computeTransportEmission } from '../v1/transport/route'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const inputs = Object.fromEntries(searchParams)

  await trackAPIRequest(req, 'getEmissionsPerDistance', JSON.stringify(inputs))

  const km: number = inputs.km ? Number(inputs.km) : 1
  const filter = inputs.filter || (inputs.transportations ? 'all' : 'smart')

  const activeTransportations =
    inputs.transportations && typeof inputs.transportations === 'string'
      ? inputs.transportations.split(',').map((id: string) => Number(id))
      : undefined

  const ignoreRadiativeForcing = !!inputs.ignoreRadiativeForcing || false
  const fields = typeof inputs.fields === 'string' ? inputs.fields.split(',') : []

  const respObj = computeTransportEmission(
    km,
    activeTransportations,
    ignoreRadiativeForcing,
    !inputs.km ? true : filter === 'all'
  )

  return NextResponse.json(
    respObj
      ? // Set response according to field parameter
        respObj
          // @ts-expect-error Expected carpool
          .filter((transportation) => !transportation.carpool)
          .map((transportation) => {
            let response = {
              id: transportation.id,
              name: transportation.name,
              emissions: transportation.emissions,
            }
            for (const field of fields) {
              response = { ...response, [field]: transportation[field as keyof typeof transportation] }
            }
            return response
          })
      : {},
    {
      status: 200,
      headers: {
        Allow: 'GET',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
      },
    }
  )
}

export async function OPTIONS() {
  return NextResponse.json('Success', {
    status: 204,
    headers: { Allow: 'GET', 'Access-Control-Allow-Headers': 'Authorization' },
  })
}
