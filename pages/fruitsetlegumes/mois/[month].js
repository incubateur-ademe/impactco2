import categories from 'data/categories.json'
import React from 'react'

import { getMonth, slugs } from 'utils/months'

import Learning from 'components/fruitsetlegumes/Learning'
import Saisons from 'components/fruitsetlegumes/Saisons'
import Web from 'components/layout/Web'

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
