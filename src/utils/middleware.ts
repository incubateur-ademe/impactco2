import * as Sentry from '@sentry/nextjs'
import { NextRequest } from 'next/server'
import { prismaClient } from 'utils/prismaClient'

export async function trackAPIRequest(request: NextRequest, api: string, params?: string) {
  if (!process.env.TRACK_API) {
    return null
  }

  try {
    const authorization = request.headers.get('authorization')
    const referer = request.headers.get('referer')

    let name = referer || ''
    if (authorization) {
      const bearerToken = authorization.split(' ')
      if (bearerToken.length === 2 && bearerToken[0].toLowerCase() === 'bearer') {
        const apiKey = await prismaClient.apiKey.findUnique({ select: { owner: true }, where: { key: bearerToken[1] } })
        name = apiKey && apiKey.owner ? apiKey.owner : bearerToken[1]
      }
    }

    const param = `e_c=API_${name}&e_a=${api}&e_n=${params || ''}`

    await fetch(
      `${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}/matomo.php?idsite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&rec=1&${param}`,
      {
        method: 'POST',
      }
    )

    return name
  } catch (error) {
    await Sentry.captureException(error)
    const authorization = request.headers.get('authorization')
    console.error(`tracking failed - ${authorization}`, error)
  }
}

export const config = {
  matcher: '/api/:path*',
}
