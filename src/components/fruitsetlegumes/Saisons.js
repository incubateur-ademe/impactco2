import React, { useState, useEffect, useContext } from 'react'
import { useTheme } from 'styled-components'

import Fuse from '../../../node_modules/fuse.js/dist/fuse.basic.esm.min.js'
import { formatName, formatTotal } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import Section from 'components/base/Section'
import Top from 'components/misc/category/Top'
import Instruction from 'components/misc/category/Instruction'
import Bottom from 'components/misc/category/Bottom'
import Wrapper from './saisons/Wrapper'
import Search from './saisons/Search'
import List from './saisons/List'

export default function Distance(props) {
  const theme = useTheme()

  const { equivalents, categories } = useContext(DataContext)

  const [displayAll, setDisplayAll] = useState(false)

  const [search, setSearch] = useState('')

  const [results, setResults] = useState([])
  const [fuse, setFuse] = useState(null)
  useEffect(() => {
    if (equivalents) {
      setFuse(
        new Fuse(equivalents, {
          keys: [
            {
              name: 'name.fr',
              weight: 1,
            },
            {
              name: 'slug',
              weight: 0.7,
            },
            {
              name: 'subtitle.fr',
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
      setResults(
        fuse.search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      )
    } else {
      setResults(null)
    }
  }, [search, fuse])

  const [equivalentsOfTheMonth, setEquivalentsOfTheMonth] = useState([])
  useEffect(() => {
    props.category &&
      setEquivalentsOfTheMonth(
        equivalents
          .filter((equivalent) => equivalent.category === props.category.id)
          .filter((equivalent) => equivalent.default || displayAll)
          .filter(
            (equivalent) =>
              results || equivalent.months.includes(props.month.index)
          )
          .filter(
            (equivalent) =>
              !results ||
              results.find((result) => result.item.slug === equivalent.slug)
          )
          .map((equivalent) => ({
            id: `${equivalent.slug}`,
            title: formatName(equivalent.name.fr, 1, true),
            subtitle: displayAll ? formatName(equivalent.subtitle?.fr) : null,
            emoji: equivalent.emoji,
            value: formatTotal(equivalent),
            season: equivalent.months.includes(props.month.index),
            months: equivalent.months,
            to: `/categories/${
              categories.find((category) => category.id === equivalent.category)
                .slug
            }/${equivalent.slug}`,
            onClick: () =>
              window?._paq?.push([
                'trackEvent',
                'Interaction',
                'Navigation via graph categorie',
                equivalent.slug,
              ]),
          }))
          .sort((a, b) => (a.id > b.id ? 1 : -1))
      )
  }, [
    equivalents,
    categories,
    props.category,
    displayAll,
    props.month,
    results,
    theme,
  ])

  return (
    <Section>
      <Section.Content>
        <Wrapper month={props.month.long} slug={props.category.slug}>
          <Search month={props.month} search={search} setSearch={setSearch} />
          <Top>
            <Instruction />
            <Top.Checkboxes visible></Top.Checkboxes>
          </Top>
          <List
            items={equivalentsOfTheMonth}
            max={equivalentsOfTheMonth[equivalentsOfTheMonth.length - 1]?.value}
          />
          <Bottom category={props.category} />
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
