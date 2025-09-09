import * as Sentry from '@sentry/nextjs'
import { NextRequest } from 'next/server'
import { prismaClient } from 'utils/prismaClient'

export async function trackAPIRequest(request: NextRequest, api: string, params?: string) {
  if (!process.env.TRACK_API) {
    return null
  }

  const authorization = request.headers.get('authorization')
  const referer = request.headers.get('referer')

  try {
    let name = referer || ''

    if (authorization) {
      try {
        const bearerToken = authorization.split(' ')
        name = bearerToken[1] || authorization
        if (bearerToken.length === 2 && bearerToken[0].toLowerCase() === 'bearer') {
          const apiKey = await prismaClient.apiKey.findUnique({
            select: { owner: true },
            where: { key: bearerToken[1] },
          })
          if (apiKey && apiKey.owner) {
            name = apiKey.owner
          }
        }
      } catch {
        console.error(`incorrect authorization header - ${authorization}`)
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
    console.error(`tracking failed - ${referer} - ${authorization}`, error)
  }
}

export const config = {
  matcher: '/api/:path*',
}
