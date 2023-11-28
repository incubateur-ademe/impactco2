import React from 'react'
import { Category } from 'types/category'
import categories from 'data/categories.json'
import Iframe from 'components/layout/Iframe'
import Itinerary from 'components/transport/Itinerary'
import { TransportProvider } from 'components/transport/TransportProvider'

export default function Itineraire({ category }: { category: Category }) {
  return (
    <Iframe>
      <TransportProvider>
        <Itinerary category={category} iframe />
      </TransportProvider>
    </Iframe>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 4),
    },
  }
}
