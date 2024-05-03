import React, { useMemo } from 'react'
import { Category as CategoryType } from 'types/category'
import Shareable from 'components/shareable/Shareable'
import { overScreenCategoryValues } from 'components/shareable/overScreens/Values'
import CategorySimulator from './CategorySimulator'
import { simulators } from './simulators'

const Category = ({ category }: { category: CategoryType }) => {
  const overScreens = useMemo(() => overScreenCategoryValues(category), [category])

  return (
    <Shareable tracking={category.name} overScreens={overScreens}>
      {simulators[category.slug] || (category.equivalents && <CategorySimulator equivalents={category.equivalents} />)}
    </Shareable>
  )
}

export default Category
