import React from 'react'
import { Category } from 'types/category'
import categories from 'data/categories.json'
import SuggestionBanner from 'components/contact/SuggestionBanner'
import Web from 'components/layout/Web'
import Learning from 'components/misc/Learning'
import { SourcesWrapper } from 'components/misc/category/CategoryWrapper.styles'
import Sources from 'components/misc/category/Sources'
import Itinerary from 'components/transport/Itinerary'

export default function ItinerairePage({ category }: { category: Category }) {
  return (
    <Web
      title={category.meta.title}
      description={category.meta.description}
      image={`meta/${category.slug}.png`}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <Itinerary category={category} />
      {category.sources && (
        <SourcesWrapper>
          <Sources priority='secondary' sources={category.sources} tracking={category.name} />
        </SourcesWrapper>
      )}
      <Learning category={category} from='/transport/itineraire' fromLabel='Transport itinéraire' />
      <SuggestionBanner
        from='/transport/itineraire'
        fromLabel='Transport itinéraire'
        simulatorName='simulateur transport'
      />
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
