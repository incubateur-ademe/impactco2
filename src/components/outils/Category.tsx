'use client'

import React, { Dispatch, SetStateAction, useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Category as CategoryType } from 'types/category'
import Shareable from 'components/shareable/Shareable'
import { overScreenCategoryValues } from 'components/shareable/overScreens/Values'
import CategorySimulator from './CategorySimulator'
import { simulators } from './simulators'

const Category = ({ category }: { category: CategoryType }) => {
  const allParams = useParamContext()

  const overScreens = useMemo(() => overScreenCategoryValues(category), [category])

  const params = useMemo<{ displayAll: boolean; setDisplayAll: Dispatch<SetStateAction<boolean>> }>(() => {
    // @ts-expect-error: managed in hook
    return allParams[category.slug]
  }, [allParams, category])
  return (
    <Shareable tracking={category.name} overScreens={overScreens}>
      {simulators[category.slug] ||
        (category.equivalents && (
          <CategorySimulator
            equivalents={
              !params || params.displayAll
                ? category.equivalents
                : category.equivalents.filter((equivalent) => equivalent.default)
            }
            displayAll={params ? params.displayAll : undefined}
            setDisplayAll={params ? params.setDisplayAll : undefined}
            displayAllText={category.displayAll}
            hideAllText={category.hideAll}
          />
        ))}
    </Shareable>
  )
}

export default Category
