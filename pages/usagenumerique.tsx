import React from 'react'
import { Category as CategoryType } from 'types/category'
import categories from 'data/categories.json'
import SuggestionBanner from 'components/contact/SuggestionBanner'
import Web from 'components/layout/Web'
import Category from 'components/numerique/Category'

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
      <Category category={category} />
      <SuggestionBanner from='/usagenumerique' fromLabel='Usage numérique' simulatorName='simulateur usage numérique' />
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
