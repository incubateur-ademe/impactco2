import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { trackAPIRequest } from 'utils/middleware'

export const searchValidation = z.object({
  search: z.string(),
  limit: z.number().optional(),
})

const layers = ['city', 'street', 'house']

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const inputs = searchValidation.safeParse(req.body)
  if (!inputs.success) {
    res.status(400).json(inputs.error)
    return
  }

  const { search, limit } = inputs.data
  await trackAPIRequest(req, 'search', search)

  const data = await axios
    .get(
      `https://photon.komoot.io/api/?q=${search}${limit ? `&limit=${limit}` : ''}&${layers
        .map((layer) => `layer=${layer}`)
        .join('&')}&lang=fr`
    )
    .then((resp) => resp.data)
  return res.status(200).json(data || {})
}
