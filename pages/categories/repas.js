import React from 'react'

import categories from 'data/categories.json'

import Web from 'components/layout/Web'
import Category from 'components/misc/Category'
import Learning from 'components/repas/Learning'

export default function Repas(props) {
  return (
    <Web
      title={props.category.title}
      description={props.category.description}
      breadcrumb={{
        type: 'equivalent',
        category: props.category,
      }}
    >
      <Category category={props.category} />
      <Learning />
    </Web>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 2),
    },
  }
}
