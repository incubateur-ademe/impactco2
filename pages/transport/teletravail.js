import React from 'react'

import categories from 'data/categories.json'

import { TransportProvider } from 'components/transport/TransportProvider'
import Web from 'components/layout/Web'
import Teletravail from 'components/transport/Teletravail'
import Learning from 'components/misc/category/Learning'

export default function TeletravailPage(props) {
  return (
    <Web
      title={props.category.meta.title}
      description={props.category.meta.description}
      breadcrumb={{
        type: 'equivalent',
        category: props.category,
      }}
    >
      <TransportProvider>
        <Teletravail category={props.category} />
        <Learning category={props.category} />
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
