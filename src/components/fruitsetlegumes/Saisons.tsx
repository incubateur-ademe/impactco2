import Fuse, { FuseResult } from 'fuse.js'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import { Equivalent, FruitsEtLegumesEquivalent } from 'types/equivalent'
import { computeECV } from 'utils/computeECV'
import formatName from 'utils/formatName'
import { track } from 'utils/matomo'
import DataContext from 'components/providers/DataProvider'
import ShareableContent from 'components/misc/ShareableContent'
import Bottom from 'components/misc/category/Bottom'
import { Header } from 'components/misc/category/CategoryWrapper.styles'
import Instruction from 'components/misc/category/Instruction'
import { Top } from 'components/misc/category/Top'
import { OverScreenCategory } from 'components/misc/category/overScreens/Type'
import { overScreenCategoryValues } from 'components/misc/category/overScreens/Values'
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

export default function Saisons({ category, iframe, month }: { category: Category; iframe?: boolean; month?: number }) {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(month)

  useEffect(() => {
    if (router.isReady && month === undefined) {
      if (router.query.month) {
        setCurrentMonth(Number.parseInt(router.query.month as string))
      } else {
        setCurrentMonth(new Date().getMonth())
      }
    }
  }, [setCurrentMonth, router, month])

  const { equivalents } = useContext(DataContext)

  const [sorting, setSorting] = useState('alph_desc')

  const [search, setSearch] = useState('')

  const [results, setResults] = useState<FuseResult<Equivalent>[] | undefined>()
  const [fuse, setFuse] = useState<Fuse<Equivalent>>()

  useEffect(() => {
    if (equivalents) {
      setFuse(
        new Fuse(equivalents, {
          keys: [
            {
              name: 'name',
              weight: 1,
            },
            {
              name: 'slug',
              weight: 0.7,
            },
            {
              name: 'subtitle',
              weight: 0.4,
            },
          ],
          threshold: 0.3,
          ignoreLocation: false,
        })
      )
    }
  }, [equivalents])

  useEffect(() => {
    if (fuse && search.length > 0) {
      setResults(fuse.search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
    } else {
      setResults(undefined)
    }
  }, [search, fuse])

  const equivalentsOfTheMonth = useMemo(
    () =>
      currentMonth !== undefined &&
      category &&
      equivalents
        .filter((equivalent) => equivalent.category === category.id)
        .filter((equivalent) => results || (equivalent as FruitsEtLegumesEquivalent).months.includes(currentMonth))
        .filter((equivalent) => !results || results.find((result) => result.item.slug === equivalent.slug))
        .map((equivalent) => ({
          id: `${equivalent.slug}`,
          title: formatName(equivalent.name, 1, true),
          emoji: equivalent.emoji,
          value: computeECV(equivalent),
          season: (equivalent as FruitsEtLegumesEquivalent).months.includes(currentMonth),
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
    [equivalents, category, currentMonth, results, sorting]
  )
  const [overScreen, setOverScreen] = useState<OverScreenCategory | undefined>()
  const overScreenValues = useMemo(
    () => overScreenCategoryValues(category, { month: (currentMonth || '0').toString() }),
    [category, currentMonth]
  )

  return currentMonth !== undefined && equivalentsOfTheMonth ? (
    <ShareableContent<OverScreenCategory>
      category={category}
      params={{ month: currentMonth.toString() }}
      iframe={iframe}
      tracking={category.name}
      setOverScreen={setOverScreen}
      overScreen={overScreen ? overScreenValues[overScreen] : undefined}
      header={
        <>
          <Header>
            <h2 className='title-h3'>
              Découvrez les fruits et légumes de <MonthSelector month={currentMonth} setMonth={setCurrentMonth} />
            </h2>
          </Header>
          <StyledTop>
            <Instruction title={category.equivalent} gender={category.gender} />
            <Search month={month} search={search} setSearch={setSearch} sorting={sorting} setSorting={setSorting} />
          </StyledTop>
        </>
      }>
      <List items={equivalentsOfTheMonth} max={equivalentsOfTheMonth[equivalentsOfTheMonth.length - 1]?.value} />
      <Bottom category={category} iframe={iframe} />
    </ShareableContent>
  ) : null
}
