import React from 'react'

import categories from 'data/categories.json'

import Web from 'components/layout/Web'
import Category from 'components/numerique/Category'
import Learning from 'components/numerique/Learning'

export default function Numerique(props) {
  return (
    <Web
      title={props.category.meta.title}
      description={props.category.meta.description}
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
      category: categories.find((item) => item.id === 10),
    },
  }
}
