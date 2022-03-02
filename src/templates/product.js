import React from 'react'

import Web from 'components/layout/Web'

export default function product(props) {
  return (
    <Web
      title={props.pageContext.product.Nom}
      result={props.pageContext.product['Nom']}
    >
      {props.pageContext.product['Nom']}
    </Web>
  )
}
