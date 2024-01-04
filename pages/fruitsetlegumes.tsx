import React from 'react'
import { Category as CategoryType } from 'types/category'
import categories from 'data/categories.json'
import SuggestionBanner from 'components/contact/SuggestionBanner'
import LearningFruit from 'components/fruitsetlegumes/LearningFruit'
import Saisons from 'components/fruitsetlegumes/Saisons'
import Web from 'components/layout/Web'
import SourceAgribalyse from 'components/misc/SourceAgribalyse'

export default function Fruitsetlegumes({ category }: { category: CategoryType }) {
  return (
    <Web
      title={category.name}
      description={category.meta.description}
      image={`meta/${category.slug}.png`}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <Saisons category={category} />
      <SourceAgribalyse tracking={category.name} />
      <LearningFruit />
      <SuggestionBanner
        from={category.slug}
        fromLabel={category.name}
        simulatorName={`comparateur ${category.name.toLowerCase()}`}
      />
    </Web>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 9),
    },
  }
}
