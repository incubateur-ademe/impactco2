import React from 'react'
import { Category } from 'types/category'
import categories from 'data/categories.json'
import Web from 'components/layout/Web'
import Learning from 'components/misc/Learning'
import Teletravail from 'components/transport/Teletravail'
import { TransportProvider } from 'components/transport/TransportProvider'

export default function TeletravailPage({ category }: { category: Category }) {
  return (
    <Web
      title={category.meta.title}
      description={category.meta.description}
      image={`meta/${category.slug}.png`}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <TransportProvider type='teletravail'>
        <Teletravail category={category} />
        <Learning category={category} />
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
