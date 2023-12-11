import { NextApiRequest } from 'next'
import { prismaClient } from 'utils/prismaClient'

export async function trackAPIRequest(request: NextApiRequest, api: string, params?: string) {
  if (!process.env.TRACK_API) {
    return false
  }

  try {
    const { authorization, referer } = request.headers

    let name = referer || ''
    if (authorization) {
      const bearerToken = authorization.split(' ')
      if (bearerToken.length === 2 && bearerToken[0].toLowerCase() === 'bearer') {
        const apiKey = await prismaClient.apiKey.findUnique({ select: { owner: true }, where: { key: bearerToken[1] } })
        name = apiKey && apiKey.owner ? apiKey.owner : bearerToken[1]
      }
    }

    const param = `e_c=API_${name}&e_a=${api}&e_n=${params || ''}`

    await fetch(`https://stats.data.gouv.fr/matomo.php?idsite=${process.env.MATOMO_SIDE_ID}&rec=1&${param}`, {
      method: 'POST',
    })
    return !!name
  } catch (error) {
    console.error(`tracking failed - ${request.headers.authorization}`, error)
  }
}

export const config = {
  matcher: '/api/:path*',
}
