import { Metadata } from 'next'
import React from 'react'
import { Category as CategoryType } from 'types/category'
import { categories } from 'data/categories'
import Category from 'components/outils/CategoryPage'
import Suggestion from 'components/layout/Suggestion'

const category = categories.find((category) => category.slug === 'transport') as CategoryType

export const metadata: Metadata = {
  title: `${category.name} | Impact CO₂`,
  description: category.description,
  openGraph: {
    creators: 'ADEME',
    images: `meta/${category.slug}.png`,
  },
}
const page = () => {
  return (
    <>
      <Category category={category} />
      <Suggestion
        from={`/outils/${category.slug}`}
        fromLabel={category.name}
        simulatorName={`de la thématique ${category.name}`}
      />
    </>
  )
}

export default page
