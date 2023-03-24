import categories from 'data/categories.json'
import React from 'react'

import { getMonth, slugs } from 'utils/months'

import Saisons from 'components/fruitsetlegumes/Saisons'
import Iframe from 'components/layout/Iframe'

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
