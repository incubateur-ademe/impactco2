'use client'

import { useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

const DetecteurPage = () => {
  const params = useSearchParams()

  const load = () => {
    // @ts-expect-error: Loaded by script
    if (window.impactCO2Detection) {
      const language = params.get('language') || 'fr'
      const category = params.get('category') || 'all'
      const theme = params.get('theme') || 'false'
      const equivalents = params.get('equivalents') || ''
      if (language !== 'fr') {
        setTimeout(() => {
          // @ts-expect-error: Loaded by script
          window.impactCO2Detection(theme === 'true', language, category, equivalents)
        }, 2000)
      } else {
        // @ts-expect-error: Loaded by script
        window.impactCO2Detection(theme === 'true', language, category, equivalents)
      }
    }
  }

  useEffect(() => {
    load()
  }, [])

  return <Script src='/scripts/detection-async.js' onLoad={() => load()} />
}

export default DetecteurPage
