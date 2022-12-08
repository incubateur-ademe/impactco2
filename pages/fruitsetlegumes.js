import React from 'react'

import categories from 'data/categories.json'

import { slugs, getMonth } from 'utils/months'
import Web from 'components/layout/Web'
import Saisons from 'components/fruitsetlegumes/Saisons'
import Learning from 'components/misc/category/Learning'

export default function Transport(props) {
  const date = new Date()
  const month = {
    slug: slugs[date.getMonth()],
    index: date.getMonth(),
    ...getMonth(date.getMonth()),
  }

  return (
    <Web
      title={props.category.meta.title}
      description={props.category.meta.description}
      breadcrumb={{
        type: 'equivalent',
        category: props.category,
      }}
    >
      <Saisons category={props.category} month={month} />
      <Learning category={props.category} />
    </Web>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 9),
    },
  }
}
