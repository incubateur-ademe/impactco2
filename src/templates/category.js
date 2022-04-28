import React from 'react'

import Web from 'components/layout/Web'
import Category from 'views/Category'

export default function category(props) {
  return (
    <Web
      title={props.pageContext.category.name.fr}
      breadcrumb={{
        type: 'equivalent',
        category: props.pageContext.category,
      }}
    >
      <Category category={props.pageContext.category} />
    </Web>
  )
}
