import React from 'react'
import { Category } from 'types/category'
import categories from 'data/categories.json'
import WebBlue from 'components/layout/WebBlue'
import Impactlivraison from './impactlivraison'

export default function CategoryPage({ category }: { category: Category }) {
  return (
    <WebBlue
      title={category.meta.title}
      description={category.meta.description}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <Impactlivraison />
    </WebBlue>
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
