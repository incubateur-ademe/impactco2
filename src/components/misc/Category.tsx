import React, { useContext, useMemo, useState } from 'react'
import { Category } from 'types/category'
import { computeECV } from 'utils/computeECV'
import formatName from 'utils/formatName'
import formatUsage from 'utils/formatUsage'
import DataContext from 'components/providers/DataProvider'
import Checkbox from 'components/base/Checkbox'
import BarChart from 'components/charts/BarChart'
import SourceAgribalyse from 'components/misc/SourceAgribalyse.js'
import Bottom from './category/Bottom'
import CategoryLegend from './category/CategoryLegend'
import Description from './category/Description'
import Instruction from './category/Instruction'
import List from './category/List'
import { Checkboxes, Top } from './category/Top'
import Wrapper from './category/Wrapper'

export default function CategoryList({ category }: { category: Category }) {
  const { equivalents, categories } = useContext(DataContext)

  const [displayAll, setDisplayAll] = useState(false)

  const equivalentsOfCategory = useMemo(
    () =>
      category &&
      equivalents
        .filter((equivalent) => equivalent.category === category.id)
        .filter((equivalent) => equivalent.default || displayAll)
        .map((equivalent) => ({
          id: `${equivalent.slug}`,
          title: `${formatName(equivalent.name, 1, true)}`,
          subtitle: displayAll ? formatName(equivalent.subtitle) : null,
          emoji: equivalent.emoji,
          unit: equivalent.unit,
          value: computeECV(equivalent),
          usage: formatUsage(equivalent),
          to: `/${category.slug}/${equivalent.slug}`,
          onClick: () =>
            window?.please?.track(['trackEvent', 'Interaction', 'Navigation via graph categorie', equivalent.slug]),
        }))
        .sort((a, b) => (a.value > b.value ? 1 : -1)),

    [equivalents, categories, category, displayAll]
  )

  return (
    <>
      {category?.slug === 'boisson' ? <SourceAgribalyse /> : <></>}
      <Wrapper name={category.title || category.name} slug={category.slug}>
        <Description description={category.description} />
        <Top className='noscreenshot'>
          <Instruction title={category.equivalent} gender={category.gender} />
          <Checkboxes
            $visible={
              equivalents
                .filter((equivalent) => equivalent.category === category.id)
                .find((equivalent) => !equivalent.default) && !category.list
            }>
            <Checkbox
              name='displayAll'
              checked={displayAll}
              onChange={() => {
                setDisplayAll((prevDisplayAll) => !prevDisplayAll)
                window?.please?.track(['trackEvent', 'Interaction', 'Voir tous les équivalents', category.name])
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
            <BarChart
              items={equivalentsOfCategory}
              max={equivalentsOfCategory[equivalentsOfCategory.length - 1]?.value}
            />
            {![2, 3, 8].includes(category.id) && <CategoryLegend />}
          </>
        )}
        <Bottom category={category} />
      </Wrapper>
    </>
  )
}
