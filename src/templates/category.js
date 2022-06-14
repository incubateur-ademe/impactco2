import React from 'react'

import Web from 'components/layout/Web'
import Category from 'views/Category'

export default function category(props) {
  return (
    <Web
      title={`Découvrez l'impact de ${props.pageContext.category.name.fr} sur Mon Convertisseur CO2`}
      breadcrumb={{
        type: 'equivalent',
        category: props.pageContext.category,
      }}
    >
      <Category category={props.pageContext.category} />
    </Web>
  )
}
