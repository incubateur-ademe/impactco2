import React from 'react'
import { Category } from 'types/category'
import categories from 'data/categories.json'
import Web from 'components/layout/Web'
import Impactlivraison from './impactlivraison'

export default function CategoryPage({ category }: { category: Category }) {
  return (
    <Web
      title={category.meta.title}
      description={category.meta.description}
      image={`meta/${category.slug}.png`}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <Impactlivraison />
    </Web>
  )
}

export async function getStaticProps() {
  const category = categories?.find((category) => category.slug === 'livraison')
  return {
    props: {
      category,
    },
  }
}
