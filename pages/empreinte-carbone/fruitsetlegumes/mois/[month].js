import React from 'react'

import categories from 'data/categories.json'

import { slugs, getMonth } from 'utils/months'
import Web from 'components/layout/Web'
import Saisons from 'components/fruitsetlegumes/Saisons'
import Learning from 'components/fruitsetlegumes/Learning'

export default function Transport(props) {
  return (
    <Web
      title={props.month.long + ' | ' + props.category.title}
      description={props.category.description}
      breadcrumb={{
        type: 'equivalent',
        category: props.category,
      }}
    >
      <Saisons category={props.category} month={props.month} />
      <Learning />
    </Web>
  )
}
export async function getStaticPaths() {
  return {
    paths: slugs.map((slug) => ({
      params: { month: slug },
    })),
    fallback: false,
  }
}
export async function getStaticProps({ params }) {
  return {
    props: {
      category: categories.find((item) => item.id === 9),
      month: {
        slug: params.month,
        index: slugs.indexOf(params.month),
        ...getMonth(slugs.indexOf(params.month)),
      },
    },
  }
}
