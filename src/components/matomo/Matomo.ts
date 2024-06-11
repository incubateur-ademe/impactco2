'use client'

import { init } from '@socialgouv/matomo-next'
import { useEffect } from 'react'

const Matomo = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_MATOMO === 'true') {
      init({
        url: process.env.NEXT_PUBLIC_MATOMO_SITE_URL!,
        siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID!,
        excludeUrlsPatterns: [/\/iframes\//],
      })

      if (typeof window !== 'undefined' && typeof window.please === 'undefined') {
        //@ts-expect-error: update Matomo
        window.please = {}
        window.please.track = function (ary) {
          //@ts-expect-error: update Matomo
          window?._paq?.push(ary)
        }
      }
    }
  }, [])
  return null
}

export default Matomo
