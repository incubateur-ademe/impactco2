import React, { useState, useEffect, useContext } from 'react'

import { slugs } from 'utils/months'
import { formatName, formatTotal, formatUsage } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import Section from 'components/base/Section'
import Wrapper from 'components/misc/category/Wrapper'
import Top from 'components/misc/category/Top'
import Instruction from 'components/misc/category/Instruction'
import CategoryLegend from 'components/misc/category/CategoryLegend'
import Bottom from 'components/misc/category/Bottom'
import Checkbox from 'components/base/Checkbox'
import BarChart from 'components/charts/BarChart'
import MonthSelector from './saisons/MonthSelector'

export default function Distance(props) {
  const { equivalents, categories } = useContext(DataContext)

  const [displayAll, setDisplayAll] = useState(false)

  const [equivalentsOfTheMonth, setEquivalentsOfTheMonth] = useState([])
  useEffect(() => {
    props.category &&
      setEquivalentsOfTheMonth(
        equivalents
          .filter((equivalent) => equivalent.category === props.category.id)
          .filter((equivalent) => equivalent.default || displayAll)
          .filter((equivalent) => equivalent.months.includes(props.month.index))
          .map((equivalent) => ({
            id: `${equivalent.slug}`,
            title: `1 kg de ${formatName(equivalent.name.fr)}`,
            subtitle: displayAll ? formatName(equivalent.subtitle?.fr) : null,
            emoji: equivalent.emoji,
            value: formatTotal(equivalent),
            to: `/empreinte-carbone/${
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
          .sort((a, b) => (a.value > b.value ? 1 : -1))
      )
  }, [equivalents, categories, props.category, displayAll, props.month])

  return (
    <Section>
      <Section.Content>
        <Wrapper
          name={`Les fruits et légumes de ${props.month.long}`}
          slug={props.category.slug}
        >
          <MonthSelector month={props.month} />
          <Top>
            <Instruction />
            <Top.Checkboxes visible></Top.Checkboxes>
          </Top>
          <BarChart
            items={equivalentsOfTheMonth}
            max={equivalentsOfTheMonth[equivalentsOfTheMonth.length - 1]?.value}
          />
          <Bottom category={props.category} />
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
