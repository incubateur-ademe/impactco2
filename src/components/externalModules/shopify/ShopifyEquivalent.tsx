import React from 'react'
import { Language } from 'types/equivalent'
import 'utils/variables.css'
import Equivalent from './Equivalent'
import Title from './Title'

const languages = ['fr', 'en', 'de', 'es']

function isValidHttpUrl(string: string) {
  let url

  try {
    url = new URL(string)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

const ShopifyEquivalent = () => {
  const baseValue = (document.getElementById('impact-co2-empreinte') as HTMLSpanElement).innerText
  const comparaison = (document.getElementById('impact-co2-produit') as HTMLSpanElement).innerText
  const theme = (document.getElementById('impact-co2-theme') as HTMLSpanElement).innerText
  const introduction = (document.getElementById('impact-co2-introduction') as HTMLSpanElement).innerText
  const language = (document.getElementById('impact-co2-language') as HTMLSpanElement).innerText
  const url = (document.getElementById('impact-co2-url') as HTMLSpanElement).innerText

  return (
    <Equivalent
      className={theme === 'night' ? 'night' : ''}
      baseValue={baseValue}
      comparisons={[comparaison]}
      language={languages.includes(language) ? (language as Language) : 'en'}
      url={url === 'https://impactco2.fr' || !isValidHttpUrl(url) ? undefined : url}
      title={(unit, roundedValue, intValue) => (
        <Title introduction={introduction} unit={unit} roundedValue={roundedValue} intValue={intValue} />
      )}
    />
  )
}

export default ShopifyEquivalent
