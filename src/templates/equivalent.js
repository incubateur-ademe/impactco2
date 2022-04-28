import React from 'react'

import Web from 'components/layout/Web'
import Equivalent from '../views/Equivalent'

export default function equivalent(props) {
  return (
    <Web
      title={props.pageContext.equivalent.name.fr}
      result={props.pageContext.equivalent.name.fr}
    >
      <Equivalent
        equivalent={props.pageContext.equivalent}
        category={props.pageContext.category}
      />
    </Web>
  )
}
