import React from 'react'

import categories from 'data/categories.json'

import { slugs, getMonth } from 'utils/months'
import { TransportProvider } from 'components/transport/TransportProvider'
import Web from 'components/layout/Web'
import Saisons from 'components/fruitsetlegumes/Saisons'
import Learning from 'components/fruitsetlegumes/Learning'

export default function Transport(props) {
  const date = new Date()
  const month = {
    slug: slugs[date.getMonth()],
    index: date.getMonth(),
    ...getMonth(date.getMonth()),
  }

  return (
    <Web
      title={props.category.title}
      description={props.category.description}
      breadcrumb={{
        type: 'equivalent',
        category: props.category,
      }}
    >
      <TransportProvider>
        <Saisons category={props.category} month={month} />
        <Learning />
      </TransportProvider>
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
