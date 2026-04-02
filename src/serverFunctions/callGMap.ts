'use server'

import axios from 'axios'
import { headers } from 'next/headers'
import { z } from 'zod'
import { CallGMapDistances, GMapCommand, GMapValidation, getCachedValue, insertCachedValue } from 'utils/gmaps'
import { trackAPIRequestFromHeaders } from 'utils/middleware'

type GMapDistance = { elements: { status: string; distance: { value: number } }[] }
type GMapDistances = { rows: GMapDistance[] }

const getValue = (distance: GMapDistances) => {
  if (!distance) {
    return 0
  }

  const element = distance.rows[0].elements[0]
  return (element.status === 'OK' && element.distance.value / 1000) || 0
}

export const callGMap = async (data: GMapCommand): Promise<CallGMapDistances> => {
  const inputs = GMapValidation.safeParse(data)
  if (!inputs.success) {
    throw new Error(JSON.stringify(z.treeifyError(inputs.error)))
  }

  if (!process.env.GMAP_API_KEY) {
    return { car: 91.021, foot: 87.914, rail: 91.153, plane: 80.69557099482829 }
  }

  const requestHeaders = await headers()

  const cached = await getCachedValue(inputs.data)
  if (cached) {
    await trackAPIRequestFromHeaders(requestHeaders, 'callGMap-cache')
    return cached
  }

  if (process.env.LIMIT_API === 'true') {
    const referer = requestHeaders.get('referer')

    if (!process.env.NEXT_PUBLIC_URL || !referer?.startsWith(process.env.NEXT_PUBLIC_URL)) {
      throw new Error('Not authorized')
    }

    await trackAPIRequestFromHeaders(requestHeaders, 'callGMap')
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
  return result
}
