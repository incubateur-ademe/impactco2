'use client'

import { useRef } from 'react'
import { Language } from 'types/equivalent'
import '../../utils/fonts.css'
import InternalEtiquette from 'components/comparateur/Etiquette'
import './color.css'
import './styles.css'

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
      className='impact-co2-etiquette'
      ref={ref}
      comparisons={comparisons}
      baseValue={value}
      animated={animated}
      language={language || 'fr'}
    />
  )
}

export default Etiquette
