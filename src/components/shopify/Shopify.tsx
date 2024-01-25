import React from 'react'
import Equivalent from './Equivalent'

const Shopify = () => {
  const baseValue = (document.getElementById('impact-co2-empreinte') as HTMLSpanElement).innerText
  const comparaison = (document.getElementById('impact-co2-produit') as HTMLSpanElement).innerText

  return <Equivalent baseValue={baseValue} comparaison={comparaison} />
}

export default Shopify
