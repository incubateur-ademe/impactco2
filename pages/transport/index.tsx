import React from 'react'
import { Category } from 'types/category'
import categories from 'data/categories.json'
import SuggestionBanner from 'components/contact/SuggestionBanner'
import Web from 'components/layout/Web'
import Learning from 'components/misc/Learning'
import Distance from 'components/transport/Distance'
import { TransportProvider } from 'components/transport/TransportProvider'

export default function DistancePage({ category }: { category: Category }) {
  return (
    <Web
      title={category.meta.title}
      description={category.meta.description}
      image={`meta/${category.slug}.png`}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <TransportProvider>
        <Distance category={category} />
        <Learning category={category} fromLabel='Transport distance' />
        <SuggestionBanner from={category.slug} fromLabel='Transport distance' simulatorName='simulateur transport' />
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
