'use client'

import React, { useRef } from 'react'
import { Language } from 'types/equivalent'
import InternalEtiquette from 'components/comparateur/Etiquette'

const Etiquette = ({
  comparisons,
  value,
  animated,
  language,
}: {
  comparisons: string[]
  value: number
  animated?: boolean
  language?: Language
}) => {
  const ref = useRef(null)
  return (
    <InternalEtiquette
      ref={ref}
      comparisons={comparisons}
      baseValue={value.toString()}
      animated={animated}
      language={language || 'fr'}
    />
  )
}

export default Etiquette
