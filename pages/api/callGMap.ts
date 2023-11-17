import axios from 'axios'
import { ValueDeterminingMiddleware, rateLimit } from 'express-rate-limit'
import slowDown from 'express-slow-down'
import { NextApiRequest, NextApiResponse } from 'next'
import { trackAPIRequest } from 'utils/middleware'

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.LIMIT_API) {
    if (!req.headers.referer?.startsWith(`https://${process.env.WEBSITE_URL}`)) {
      return res.status(403).send('Not authorized')
    }
    try {
      await Promise.all(middlewares.map((middleware) => middleware(req, res)))
    } catch {
      return res.status(429).send('Too Many Requests')
    }
  }

  const queryString = new URLSearchParams(req.query as Record<string, string>).toString()
  await trackAPIRequest(req, 'callGMap', queryString)

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?${queryString}&key=${process.env.GMAP_API_KEY}`

  const data = await axios.get(url).then((resp) => {
    return {
      statusCode: 200,
      body: resp.data,
    }
  })
  return res.status(200).json(data?.body || {})
}
