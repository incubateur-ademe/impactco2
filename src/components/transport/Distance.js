import React, { useState, useEffect, useContext } from 'react'

import { formatName, formatTotal } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import TransportContext from 'components/transport/TransportProvider'
import Section from 'components/base/Section'
import Top from 'components/misc/categoryList/Top'
import Instruction from 'components/misc/categoryList/Instruction'
import Bottom from 'components/misc/categoryList/Bottom'
import Checkbox from 'components/base/Checkbox'
import BarChart from 'components/charts/BarChart'

export default function Distance(props) {
  const { equivalents, categories } = useContext(DataContext)

  const { km, carpool } = useContext(TransportContext)

  const [displayAll, setDisplayAll] = useState(false)

  const [equivalentsOfCategory, setEquivalentsOfCategory] = useState([])
  useEffect(() => {
    props.category &&
      setEquivalentsOfCategory(
        equivalents
          .filter((equivalent) => equivalent.category === props.category.id)
          .filter((equivalent) => equivalent.default || displayAll)
          .filter(
            (equivalent) =>
              // Display all transportations
              displayAll ||
              // No display indicator at all
              !equivalent.display ||
              // Empty display indicator
              (!equivalent.display.min && !equivalent.display.max) ||
              //Only max
              (!equivalent.display.min && equivalent.display.max >= km) ||
              //Only min
              (!equivalent.display.max && equivalent.display.min <= km) ||
              //Both min and max
              (equivalent.display.min <= km && equivalent.display.max >= km)
          )
          .map((equivalent) => ({
            id: `${equivalent.slug}`,
            title: `${formatName(equivalent.name.fr, 1, true)}`,
            subtitle:
              (displayAll || equivalent.name.fr === 'Voiture') &&
              equivalent.subtitle
                ? `(${formatName(equivalent.subtitle?.fr)})`
                : null,
            emoji: equivalent.emoji,
            value: formatTotal(equivalent) * km,
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
          .sort((a, b) => (a.value > b.value ? 1 : -1))
      )
  }, [equivalents, categories, props.category, displayAll, km])

  return (
    <Section>
      <Section.Content>
        {equivalentsOfCategory.length ? (
          <Top>
            <Instruction />
            <Top.Checkboxes visible>
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
        ) : null}
        <BarChart
          items={equivalentsOfCategory}
          max={equivalentsOfCategory[equivalentsOfCategory.length - 1]?.value}
        />
        {equivalentsOfCategory.length && <Bottom category={props.category} />}
      </Section.Content>
    </Section>
  )
}
