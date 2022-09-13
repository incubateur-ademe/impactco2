import React, { useState, useEffect, useContext } from 'react'

import { formatName, formatTotal, formatUsage } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import Section from 'components/base/Section'
import Checkbox from 'components/base/Checkbox'
import BarChart from 'components/charts/BarChart'
import Wrapper from './category/Wrapper'
import Top from './category/Top'
import Instruction from './category/Instruction'
import CategoryLegend from './category/CategoryLegend'
import Bottom from './category/Bottom'

export default function CategoryList(props) {
  const { equivalents, categories } = useContext(DataContext)

  const [displayAll, setDisplayAll] = useState(false)

  const [equivalentsOfCategory, setEquivalentsOfCategory] = useState([])
  useEffect(() => {
    props.category &&
      setEquivalentsOfCategory(
        equivalents
          .filter((equivalent) => equivalent.category === props.category.id)
          .filter((equivalent) => equivalent.default || displayAll)
          .map((equivalent) => ({
            id: `${equivalent.slug}`,
            title: `${formatName(equivalent.name.fr, 1, true)}`,
            subtitle: displayAll ? formatName(equivalent.subtitle?.fr) : null,
            emoji: equivalent.emoji,
            value: formatTotal(equivalent),
            usage: formatUsage(equivalent),
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
  }, [equivalents, categories, props.category, displayAll])

  return (
    <Section>
      <Section.Content>
        <Wrapper name={props.category.name.fr} slug={props.category.slug}>
          <Top className='noscreenshot'>
            <Instruction />
            <Top.Checkboxes
              visible={equivalents
                .filter(
                  (equivalent) => equivalent.category === props.category.id
                )
                .find((equivalent) => !equivalent.default)}
            >
              <Checkbox
                name='displayAll'
                checked={displayAll}
                onChange={() => {
                  setDisplayAll((prevDisplayAll) => !prevDisplayAll)
                  window?._paq?.push([
                    'trackEvent',
                    'Interaction',
                    'Voir tous les équivalents',
                    props.category.name.fr,
                  ])
                }}
              >
                Voir tous les équivalents
              </Checkbox>
            </Top.Checkboxes>
          </Top>
          <BarChart
            items={equivalentsOfCategory}
            max={equivalentsOfCategory[equivalentsOfCategory.length - 1]?.value}
          />
          {![2, 3].includes(props.category.id) && <CategoryLegend />}
          <Bottom category={props.category} />
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
