import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import { FruitsEtLegumesEquivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import { track } from 'utils/matomo'
import useParamContext from 'components/providers/ParamProvider'
import { computedEquivalents } from 'components/providers/equivalents'
import { useSearchEquivalent } from 'components/providers/useSearchEquivalent'
import ShareableContent from 'components/misc/ShareableContent'
import Bottom from 'components/misc/category/Bottom'
import { Header } from 'components/misc/category/CategoryWrapper.styles'
import Instruction from 'components/misc/category/Instruction'
import { Top } from 'components/misc/category/Top'
import { CustomParamValue } from 'components/misc/shareable/overScreens/CustomParam'
import { overScreenCategoryValues } from 'components/misc/shareable/overScreens/Values'
import List from './saisons/List'
import Search from './saisons/Search'
import MonthSelector from './saisons/wrapper/MonthSelector'

const StyledTop = styled(Top)`
  align-items: center;
  margin-bottom: 0.75rem;

  p {
    margin: 0;
  }
`

export default function Saisons({ category, iframe }: { category: Category; iframe?: boolean }) {
  const {
    fruitsetlegumes: { month, setMonth, sorting, setSorting, search, setSearch },
  } = useParamContext()

  const results = useSearchEquivalent(search)

  const equivalentsOfTheMonth = useMemo(
    () =>
      month !== undefined &&
      category &&
      computedEquivalents
        .filter((equivalent) => equivalent.category === category.id)
        .filter((equivalent) => results || (equivalent as FruitsEtLegumesEquivalent).months.includes(month))
        .filter((equivalent) => !results || results.find((result) => result.slug === equivalent.slug))
        .map((equivalent) => ({
          id: `${equivalent.slug}`,
          title: formatName(equivalent.name, 1, true),
          emoji: equivalent.emoji,
          value: equivalent.value,
          season: (equivalent as FruitsEtLegumesEquivalent).months.includes(month),
          months: (equivalent as FruitsEtLegumesEquivalent).months,
          to: `/${category.slug}/${equivalent.slug}`,
          onClick: () => track('Fruits et légumes', 'Navigation equivalent', equivalent.slug),
        }))
        .sort((a, b) =>
          sorting.includes('alph')
            ? a.id > b.id
              ? sorting.includes('desc')
                ? 1
                : -1
              : sorting.includes('desc')
                ? -1
                : 1
            : a.value > b.value
              ? sorting.includes('desc')
                ? -1
                : 1
              : sorting.includes('desc')
                ? 1
                : -1
        ),
    [category, month, results, sorting]
  )

  const params = useMemo(
    () => ({
      month: { value: month, setter: (value) => setMonth(Number.parseInt(value.toString())) } as CustomParamValue,
    }),
    [month, setMonth]
  )
  const [overScreen, setOverScreen] = useState<string | undefined>()
  const overScreenValues = useMemo(() => overScreenCategoryValues(category), [category, params])

  return month !== undefined && equivalentsOfTheMonth ? (
    <ShareableContent<string>
      category={category}
      params={params}
      iframe={iframe}
      tracking={category.name}
      setOverScreen={setOverScreen}
      overScreen={overScreen ? overScreenValues[overScreen] : undefined}
      header={
        <>
          <Header className='title-h3'>
            Découvrez les fruits et légumes de <MonthSelector month={month} setMonth={setMonth} />
          </Header>
          <StyledTop>
            <Instruction category={category} />
            <Search search={search} setSearch={setSearch} sorting={sorting} setSorting={setSorting} />
          </StyledTop>
        </>
      }>
      <List items={equivalentsOfTheMonth} max={equivalentsOfTheMonth[equivalentsOfTheMonth.length - 1]?.value} />
      <Bottom category={category} iframe={iframe} />
    </ShareableContent>
  ) : null
}
