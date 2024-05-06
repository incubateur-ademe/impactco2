'use client'

import Script from 'next/script'
import React, { useEffect } from 'react'

const DetecteurPage = () => {
  useEffect(() => {
    // @ts-expect-error: Loaded by script
    if (window.impactCO2Detection) {
      // @ts-expect-error: Loaded by script
      window.impactCO2Detection()
    }
  }, [])

  return (
    <Script
      src='/scripts/detection-async.js'
      onLoad={() => {
        // @ts-expect-error: Loaded by script
        window.impactCO2Detection()
      }}
    />
  )
}

export default DetecteurPage
