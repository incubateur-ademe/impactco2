import React from 'react'
import { Category as CategoryType } from 'types/category'
import { categories } from 'data/categories'
import Category from 'components/outils/Category'

const category = categories.find((category) => category.slug === 'transport') as CategoryType

const page = () => {
  return <Category category={category} />
}

export default page
