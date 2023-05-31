import categories from 'data/categories.json'
import React from 'react'

import Web from 'components/layout/Web'

export default function ImpactLivraison(props) {
  return (
    <Web
      title={props.category.meta.title}
      description={props.category.meta.description}
      breadcrumb={{
        type: 'equivalent',
        category: props.category,
      }}
      isRawFooter={true}
    ></Web>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.slug === 'impactlivraison'),
    },
  }
}
