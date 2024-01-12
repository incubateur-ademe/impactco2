import React from 'react'
import { Category } from 'types/category'
import categories from 'data/categories.json'
import Iframe from 'components/layout/Iframe'
import Distance from 'components/transport/Distance'
import { TransportProvider } from 'components/transport/TransportProvider'

export default function DistancePage({ category }: { category: Category }) {
  return (
    <Iframe noLogo>
      <TransportProvider>
        <Distance category={category} iframe />
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
