import categories from 'data/categories.json'
import React from 'react'

import Web from 'components/layout/Web'
import Learning from 'components/misc/category/Learning'
import Itinerary from 'components/transport/Itinerary'
import { TransportProvider } from 'components/transport/TransportProvider'

export default function ItinerairePage(props) {
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
        <Itinerary category={props.category} />
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
