import React from 'react'
import { Category } from 'types/category'
import categories from 'data/categories.json'
import Iframe from 'components/layout/Iframe'
import Teletravail from 'components/transport/Teletravail'
import { TransportProvider } from 'components/transport/TransportProvider'

export default function TeletravailPage({ category }: { category: Category }) {
  return (
    <Iframe>
      <TransportProvider>
        <Teletravail category={category} iframe />
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
