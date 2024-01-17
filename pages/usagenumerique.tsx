import React from 'react'
import { Category as CategoryType } from 'types/category'
import categories from 'data/categories.json'
import SuggestionBanner from 'components/contact/SuggestionBanner'
import Web from 'components/layout/Web'
import Category from 'components/numerique/Category'
import { RulesProviderNumerique } from 'components/numerique/RulesProviderNumerique'

export default function Numerique({ category }: { category: CategoryType }) {
  return (
    <Web
      title={category.meta.title}
      description={category.meta.description}
      image={`meta/${category.slug}.png`}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <RulesProviderNumerique>
        <Category category={category} />
        <SuggestionBanner
          from='/usagenumerique'
          fromLabel='Usage numérique'
          simulatorName='simulateur usage numérique'
        />
      </RulesProviderNumerique>
    </Web>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 10),
    },
  }
}
