'use client'

import { useSearchParams } from 'next/navigation'
import React, { useMemo, useRef } from 'react'
import { Language } from 'types/equivalent'
import EtiquetteContent from 'components/comparateur/Etiquette'

const IFrameEtiquette = ({ animated }: { animated?: boolean }) => {
  const params = useSearchParams()
  const values = useMemo(() => {
    if (!params) {
      return null
    }
    console.log(params.get('comparisons'))
    return {
      baseValue: Number(params.get('value') || 100) * 1000,
      comparisons: ((params.get('comparisons')?.replace(' ', '+') || 'random') as string).split(','),
      language: (params.get('language') as Language) || 'fr',
    }
  }, [params])
  const ref = useRef(null)
  console.log(values?.comparisons)
  return values ? <EtiquetteContent {...values} animated={animated} ref={ref} /> : null
}

export default IFrameEtiquette
