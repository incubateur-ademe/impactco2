import React from 'react'

import categories from 'data/categories.json'

import { TransportProvider } from 'components/transport/TransportProvider'
import Web from 'components/layout/Web'
import Itinerary from 'components/transport/Itinerary'
import Learning from 'components/transport/Learning'

export default function ItinerairePage(props) {
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
        <Itinerary category={props.category} />
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
