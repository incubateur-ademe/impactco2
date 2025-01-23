'use client'

import { useMemo, useRef } from 'react'
import { useComparateurStore } from 'src/providers/stores/comparateur'
import { useGlobalStore } from 'src/providers/stores/global'
import Etiquette from 'components/comparateur/Etiquette'

const EtiquetteSimulator = ({ animated }: { animated?: boolean }) => {
  const { language } = useGlobalStore()
  const { baseValue, weight, equivalents, comparedEquivalent } = useComparateurStore()
  const etiquettes = useMemo(
    () => (comparedEquivalent ? [comparedEquivalent.slug, ...equivalents] : equivalents),
    [comparedEquivalent, equivalents]
  )
  const ref = useRef<HTMLDivElement>(null)
  return (
    <Etiquette
      baseValue={(baseValue * weight * 1000).toString()}
      comparisons={etiquettes}
      animated={animated}
      ref={ref}
      language={language}
    />
  )
}

export default EtiquetteSimulator
