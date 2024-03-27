import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { Category } from 'types/category'
import formatName from 'utils/formatName'
import formatUsage from 'utils/formatUsage'
import { track } from 'utils/matomo'
import useParamContext from 'components/providers/ParamProvider'
import { computedEquivalents } from 'components/providers/equivalents'
import Checkbox from 'components/base/Checkbox'
import BarChart from 'components/charts/BarChart'
import Bottom from './category/Bottom'
import CategoryLegend from './category/CategoryLegend'
import CategoryWrapper from './category/CategoryWrapper'
import Instruction from './category/Instruction'
import List from './category/List'
import { Checkboxes, Top } from './category/Top'

export default function CategoryList({ category, iframe }: { category: Category; iframe?: boolean }) {
  const params = useParamContext()

  // @ts-expect-error: Category is managed in params
  const { displayAll, setDisplayAll } = (params[category.slug] || { displayAll: false, setDisplayAll: () => {} }) as {
    displayAll: boolean
    setDisplayAll: Dispatch<SetStateAction<boolean>>
  }
  const equivalentsOfCategory = useMemo(
    () =>
      category &&
      computedEquivalents
        .filter((equivalent) => equivalent.category === category.id)
        .filter((equivalent) => equivalent.default || displayAll)
        .map((equivalent) => ({
          ...equivalent,
          title: formatName(equivalent.name, 1, true),
          subtitle: displayAll ? formatName(equivalent.subtitle) : undefined,
          value: equivalent.value,
          usage: formatUsage(equivalent),
          onClick: () => track(category.name, 'Navigation equivalent', equivalent.slug),
        })),
    [category, displayAll]
  )

  return (
    <>
      <CategoryWrapper category={category} iframe={iframe}>
        <Top className='noscreenshot'>
          <Instruction title={category.equivalent} gender={category.gender} />
          <Checkboxes
            $visible={
              computedEquivalents
                .filter((equivalent) => equivalent.category === category.id)
                .find((equivalent) => !equivalent.default) && !category.list
            }>
            <Checkbox
              name='displayAll'
              checked={displayAll}
              onChange={() => {
                setDisplayAll((prevDisplayAll) => !prevDisplayAll)
                track(category.name, 'Voir tous', displayAll ? 'faux' : 'vrai')
              }}>
              Voir {category.gender === 'f' ? 'toutes' : 'tous'} les{' '}
              {formatName(category.equivalent, 2) || 'équivalents'}
            </Checkbox>
          </Checkboxes>
        </Top>
        {category.list ? (
          <List items={equivalentsOfCategory} max={equivalentsOfCategory[equivalentsOfCategory.length - 1]?.value} />
        ) : (
          <>
            <BarChart equivalents={equivalentsOfCategory} category={category} />
            {![2, 3, 8].includes(category.id) && <CategoryLegend />}
          </>
        )}
        <Bottom category={category} />
      </CategoryWrapper>
    </>
  )
}
