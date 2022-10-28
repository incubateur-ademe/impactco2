import React from 'react'

import categories from 'data/categories.json'

import { slugs, getMonth } from 'utils/months'
import Iframe from 'components/layout/Iframe'
import Saisons from 'components/fruitsetlegumes/Saisons'

export default function Transport(props) {
  return (
    <Iframe>
      <Saisons category={props.category} month={props.month} />
    </Iframe>
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
