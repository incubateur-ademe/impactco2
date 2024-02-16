import React from 'react'
import 'utils/variables.css'
import Equivalent from './Equivalent'
import Title from './Title'

const ShopifyEquivalent = () => {
  const baseValue = (document.getElementById('impact-co2-empreinte') as HTMLSpanElement).innerText
  const comparaison = (document.getElementById('impact-co2-produit') as HTMLSpanElement).innerText
  const theme = (document.getElementById('impact-co2-theme') as HTMLSpanElement).innerText
  const introduction = (document.getElementById('impact-co2-introduction') as HTMLSpanElement).innerText

  return (
    <Equivalent
      className={theme === 'night' ? 'night' : ''}
      baseValue={baseValue}
      comparisons={[comparaison]}
      title={(unit, roundedValue, intValue) => (
        <Title introduction={introduction} unit={unit} roundedValue={roundedValue} intValue={intValue} />
      )}
    />
  )
}

export default ShopifyEquivalent
