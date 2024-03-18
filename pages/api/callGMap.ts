import axios from 'axios'
import { ValueDeterminingMiddleware, rateLimit } from 'express-rate-limit'
import slowDown from 'express-slow-down'
import { NextApiRequest, NextApiResponse } from 'next'
import { DeplacementType } from 'types/equivalent'
import { ZodError, z } from 'zod'
import { getCachedValue, insertCachedValue } from 'utils/gmaps'
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

export const GMapValidation = z.object({
  destinations: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  origins: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
})

export type GMapCommand = z.infer<typeof GMapValidation>

export type CallGMapDistances = Record<DeplacementType, number>

// Largement inspiré de https://kittygiraudel.com/2022/05/16/rate-limit-nextjs-api-routes/
const getIP: ValueDeterminingMiddleware<string> = (request) =>
  (request.ip ||
    request.headers['x-forwarded-for'] ||
    request.headers['x-real-ip'] ||
    request.socket.remoteAddress) as string

// Pour info, on fait les appels 3 par 3 (mode driving, walking et transit)
// Donc on limit à 30 appels par minutes, et on ralentit au bout de la 10 eme de 100ms
export const getRateLimitMiddlewares = ({ limit = 30, windowMs = 60 * 1000, delayAfter = 10, delayMs = 100 } = {}) => [
  slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs: () => delayMs }),
  rateLimit({ keyGenerator: getIP, windowMs, max: limit }),
]

// eslint-disable-next-line @typescript-eslint/ban-types
const applyMiddleware = (middleware: Function) => (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve, reject) => {
    middleware(req, res, (result: unknown) => (result instanceof Error ? reject(result) : resolve(result)))
  })

const middlewares = getRateLimitMiddlewares().map(applyMiddleware)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CallGMapDistances | ZodError | string>
) {
  const inputs = GMapValidation.safeParse(req.body)
  if (!inputs.success) {
    res.status(400).json(inputs.error)
    return
  }

  if (process.env.LIMIT_API) {
    if (!process.env.NEXT_PUBLIC_URL || !req.headers.referer?.startsWith(process.env.NEXT_PUBLIC_URL)) {
      return res.status(403).send('Not authorized')
    }
    try {
      await Promise.all(middlewares.map((middleware) => middleware(req, res)))
    } catch {
      return res.status(429).send('Too Many Requests')
    }
  }

  if (process.env.FAKE_GMAP_DATA === 'true') {
    // Fake Paris Lyon
    return res.status(200).json({ car: 465.021, foot: 440.747, rail: 456.409, plane: 391.8120136890189 })
  }

  const cached = await getCachedValue(inputs.data)
  if (cached) {
    await trackAPIRequest(req, 'callGMap-cache', JSON.stringify(inputs.data))
    return res.status(200).json(cached)
  }

  const name = await trackAPIRequest(req, 'callGMap', JSON.stringify(inputs.data))
  if (name !== 'Impact CO2') {
    if (name === 'HACK') {
      console.error('--- Wrong usage of CallGMAP API ---', req)
    }
    return res.status(401).send('Not authorized')
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
  return res.status(200).json(result)
}
