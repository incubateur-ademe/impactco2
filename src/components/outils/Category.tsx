import React, { useMemo } from 'react'
import { Category as CategoryType } from 'types/category'
import { overScreenCategoryValues } from 'components/misc/category/overScreens/Values'
import Shareable from 'components/misc/shareable/Shareable'
import CategorySimulator from './CategorySimulator'

const Category = ({ category }: { category: CategoryType }) => {
  const overScreens = useMemo(() => overScreenCategoryValues(category), [category])

  return (
    <Shareable tracking={category.name} overScreens={overScreens}>
      {category.simulator || (category.equivalents && <CategorySimulator equivalents={category.equivalents} />)}
    </Shareable>
  )
}

export default Category
