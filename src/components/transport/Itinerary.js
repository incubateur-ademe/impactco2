import React, { useState, useEffect, useContext } from 'react'

import { formatName, formatTotal, formatNumber } from 'utils/formatters'
import useItineraries from 'hooks/useItineraries'
import DataContext from 'components/providers/DataProvider'
import TransportContext from 'components/transport/TransportProvider'
import Section from 'components/base/Section'
import Top from 'components/misc/categoryList/Top'
import Instruction from 'components/misc/categoryList/Instruction'
import Bottom from 'components/misc/categoryList/Bottom'
import Checkbox from 'components/base/Checkbox'
import BarChart from 'components/charts/BarChart'

export default function Itinerary(props) {
  const { equivalents, categories } = useContext(DataContext)

  const { carpool, start, end } = useContext(TransportContext)

  const [displayAll, setDisplayAll] = useState(false)

  const datas = useItineraries(start, end)

  const [equivalentsOfCategory, setEquivalentsOfCategory] = useState([])
  useEffect(() => {
    props.category &&
      setEquivalentsOfCategory(
        equivalents
          .filter((equivalent) => equivalent.category === props.category.id)
          .filter((equivalent) => datas[equivalent.type])
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
              (!equivalent.display.min &&
                equivalent.display.max >= datas[equivalent.type]) ||
              //Only min
              (!equivalent.display.max &&
                equivalent.display.min <= datas[equivalent.type]) ||
              //Both min and max
              (equivalent.display.min <= datas[equivalent.type] &&
                equivalent.display.max >= datas[equivalent.type])
          )
          .map((equivalent) => ({
            id: `${equivalent.slug}`,
            title: `${formatName(equivalent.name.fr, 1, true)}`,
            subtitle: `${
              (displayAll || equivalent.name.fr === 'Voiture') &&
              equivalent.subtitle
                ? `(${formatName(equivalent.subtitle?.fr)})`
                : ''
            } - ${formatNumber(datas[equivalent.type])} km`,
            emoji: equivalent.emoji,
            value: formatTotal(equivalent) * datas[equivalent.type],
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
  }, [equivalents, categories, props.category, displayAll, datas])

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
        {equivalentsOfCategory.length ? (
          <Bottom category={props.category} />
        ) : null}
      </Section.Content>
    </Section>
  )
}
