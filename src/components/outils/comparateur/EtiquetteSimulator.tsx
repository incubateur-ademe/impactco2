'use client'

import React, { useMemo, useRef } from 'react'
import useParamContext from 'components/providers/ParamProvider'
import Etiquette from 'components/comparateur/Etiquette'

const EtiquetteSimulator = ({ animated }: { animated?: boolean }) => {
  const {
    comparateur: { baseValue, weight, equivalents, comparedEquivalent },
  } = useParamContext()
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
    />
  )
}

export default EtiquetteSimulator
