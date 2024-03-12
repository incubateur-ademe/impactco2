import React from 'react'
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
  return (
    <InternalEtiquette comparisons={comparisons} baseValue={value.toString()} animated={animated} language={language} />
  )
}

export default Etiquette
