import React from 'react'

import categories from 'data/categories.json'

import Web from 'components/layout/Web'
import { TransportProvider } from 'components/transport/TransportProvider'
import Search from 'components/transport/Search'
import Distance from 'components/transport/Distance'
import Learning from 'components/transport/Learning'

export default function Transport(props) {
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
        <Search distance />
        <Distance category={props.category} />
        <Learning />
      </TransportProvider>
    </Web>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 4),
    },
  }
}
