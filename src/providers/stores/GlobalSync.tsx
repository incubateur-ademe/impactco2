'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useGlobalStore } from './global'

const GlobalSync = () => {
  const searchParams = useSearchParams()
  const { setLanguage, setShowButtons } = useGlobalStore()

  useEffect(() => {
    if (!searchParams) {
      return
    }

    const language = searchParams.get('language')
    if (language === 'en' || language === 'es') {
      setLanguage(language)
    } else {
      setLanguage('fr')
    }

    setShowButtons(searchParams.get('hideButtons') !== 'true')
  }, [searchParams, setLanguage, setShowButtons])

  return null
}

export default GlobalSync
