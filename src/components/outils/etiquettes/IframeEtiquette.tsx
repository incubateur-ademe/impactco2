'use client'

import { useSearchParams } from 'next/navigation'
import React, { useMemo, useRef } from 'react'
import EtiquetteContent from 'components/comparateur/Etiquette'

const IFrameEtiquette = ({ animated }: { animated?: boolean }) => {
  const params = useSearchParams()
  const values = useMemo(() => {
    if (!params) {
      return null
    }
    return {
      baseValue: Number(params.get('value')),
      comparisons: ((params.get('comparisons') || 'random') as string).split(','),
    }
  }, [params])
  const ref = useRef(null)
  return values ? <EtiquetteContent {...values} animated={animated} ref={ref} /> : null
}

export default IFrameEtiquette
