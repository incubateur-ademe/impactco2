import React from 'react'

import categories from 'data/categories.json'

import { slugs, getMonth } from 'utils/months'
import Iframe from 'components/layout/Iframe'
import Saisons from 'components/fruitsetlegumes/Saisons'

export default function Transport(props) {
  const date = new Date()
  const month = {
    slug: slugs[date.getMonth()],
    index: date.getMonth(),
    ...getMonth(date.getMonth()),
  }

  return (
    <Iframe url={'fruitsetlegumes'}>
      <Saisons category={props.category} month={month} />
    </Iframe>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 9),
    },
  }
}
