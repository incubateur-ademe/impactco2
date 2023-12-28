import React from 'react'
import { Category as CategoryType } from 'types/category'
import categories from 'data/categories.json'
import LearningFruit from 'components/fruitsetlegumes/LearningFruit'
import Saisons from 'components/fruitsetlegumes/Saisons'
import Web from 'components/layout/Web'

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
      <LearningFruit />
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
