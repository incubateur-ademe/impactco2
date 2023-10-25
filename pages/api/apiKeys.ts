import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from 'utils/prismaClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKeys = await prismaClient.apiKey.findMany()
  return res.status(200).json(apiKeys)
}
