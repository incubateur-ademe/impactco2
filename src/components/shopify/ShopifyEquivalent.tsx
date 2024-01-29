import React from 'react'
import 'utils/variables.css'
import Equivalent from './Equivalent'

const ShopifyEquivalent = () => {
  const baseValue = (document.getElementById('impact-co2-empreinte') as HTMLSpanElement).innerText
  const comparaison = (document.getElementById('impact-co2-produit') as HTMLSpanElement).innerText
  const theme = (document.getElementById('impact-co2-theme') as HTMLSpanElement).innerText

  return <Equivalent className={theme === 'night' ? 'night' : ''} baseValue={baseValue} comparaison={comparaison} />
}

export default ShopifyEquivalent
