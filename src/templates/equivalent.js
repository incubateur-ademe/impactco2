import React from 'react'

import Web from 'components/layout/Web'
import Equivalent from '../views/Equivalent'

export default function equivalent(props) {
  return (
    <Web
      title={props.pageContext.equivalent.name.fr}
      result={props.pageContext.equivalent.name.fr}
      breadcrumb={{
        type: 'equivalent',
        category: props.pageContext.category,
        equivalent: props.pageContext.equivalent,
      }}
    >
      <Equivalent
        equivalent={props.pageContext.equivalent}
        category={props.pageContext.category}
      />
    </Web>
  )
}
