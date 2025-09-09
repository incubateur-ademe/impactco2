'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo, useRef } from 'react'
import { TrackingProvider } from 'src/providers/TrackingProvider'
import { Language } from 'types/equivalent'
import EtiquetteContent from 'components/comparateur/Etiquette'

const IFrameEtiquette = ({ animated }: { animated?: boolean }) => {
  const params = useSearchParams()
  const values = useMemo(() => {
    if (!params) {
      return null
    }
    return {
      baseValue: Number(params.get('value') || 100) * 1000,
      comparisons: ((params.get('comparisons')?.replace(/ /g, '+') || 'random') as string).split(','),
      language: (params.get('language') as Language) || 'fr',
    }
  }, [params])
  const ref = useRef(null)
  return values ? (
    <TrackingProvider tracking='Étiquette'>
      <EtiquetteContent {...values} animated={animated} ref={ref} />
    </TrackingProvider>
  ) : null
}

export default IFrameEtiquette
