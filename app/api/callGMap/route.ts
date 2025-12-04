import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import { GMapValidation, getCachedValue, insertCachedValue } from 'utils/gmaps'
import { trackAPIRequest } from 'utils/middleware'

type GMapDistance = { elements: { status: string; distance: { value: number } }[] }
type GMapDistances = { rows: GMapDistance[] }

const getValue = (distance: GMapDistances) => {
  if (!distance) {
    return 0
  }

  const element = distance.rows[0].elements[0]
  return (element.status === 'OK' && element.distance.value / 1000) || 0
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const inputs = GMapValidation.safeParse(body)
  if (!inputs.success) {
    return NextResponse.json(inputs.error)
  }

  if (!process.env.GMAP_API_KEY) {
    // Fake Paris Lyon
    return NextResponse.json({ car: 465.021, foot: 440.747, rail: 456.409, plane: 391.8120136890189 }, { status: 200 })
  }

  const cached = await getCachedValue(inputs.data)
  if (cached) {
    await trackAPIRequest(req, 'callGMap-cache')
    return NextResponse.json(cached, { status: 200 })
  }

  if (process.env.LIMIT_API === 'true') {
    const referer = req.headers.get('referer')

    if (!process.env.NEXT_PUBLIC_URL || !referer?.startsWith(process.env.NEXT_PUBLIC_URL)) {
      return NextResponse.json('Not authorized', { status: 403 })
    }

    const name = await trackAPIRequest(req, 'callGMap')
    if (name !== 'Impact CO2') {
      if (name === 'HACK') {
        console.error('--- Wrong usage of CallGMAP API ---', req)
      }
      return NextResponse.json('Not authorized', { status: 401 })
    }
  }

  const R = 6371e3 // metres
  const φ1 = (inputs.data.origins.latitude * Math.PI) / 180 // φ, λ in radians
  const φ2 = (inputs.data.destinations.latitude * Math.PI) / 180
  const Δφ = ((inputs.data.destinations.latitude - inputs.data.origins.latitude) * Math.PI) / 180
  const Δλ = ((inputs.data.destinations.longitude - inputs.data.origins.longitude) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const planeDistance = (R * c) / 1000

  const queryString = `destinations=${inputs.data.origins.latitude}%2C${inputs.data.origins.longitude}&origins=${inputs.data.destinations.latitude}%2C${inputs.data.destinations.longitude}`
  const [driving, walking, transit] = await Promise.all([
    axios
      .get<GMapDistances>(
        `https://maps.googleapis.com/maps/api/distancematrix/json?${queryString}&mode=driving&key=${process.env.GMAP_API_KEY}`
      )
      .then((response) => response.data),
    axios
      .get<GMapDistances>(
        `https://maps.googleapis.com/maps/api/distancematrix/json?${queryString}&mode=walking&key=${process.env.GMAP_API_KEY}`
      )
      .then((response) => response.data),
    axios
      .get<GMapDistances>(
        `https://maps.googleapis.com/maps/api/distancematrix/json?${queryString}&mode=transit&key=${process.env.GMAP_API_KEY}`
      )
      .then((response) => response.data),
  ])
  const result = {
    car: getValue(driving),
    foot: getValue(walking),
    rail: getValue(transit) || getValue(driving),
    plane: planeDistance,
  }
  await insertCachedValue(inputs.data, result)
  return NextResponse.json(result, { status: 200 })
}
