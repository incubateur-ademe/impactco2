import React from 'react'
import { Category } from 'types/category'
import categories from 'data/categories.json'
import Iframe from 'components/layout/Iframe'
import Itinerary from 'components/transport/Itinerary'

export default function Itineraire({ category }: { category: Category }) {
  return (
    <Iframe noLogo>
      <Itinerary category={category} iframe />
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
