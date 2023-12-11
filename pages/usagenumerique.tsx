import React from 'react'
import { Category as CategoryType } from 'types/category'
import categories from 'data/categories.json'
import Web from 'components/layout/Web'
import Learning from 'components/misc/Learning'
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
        <Learning category={category} />
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
