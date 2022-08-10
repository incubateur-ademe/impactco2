import React, { useState, useContext } from 'react'

import useItineraries from 'hooks/useItineraries'
import useTransportations from 'hooks/useTransportations'
import DataContext from 'components/providers/DataProvider'
import TransportContext from 'components/transport/TransportProvider'
import Section from 'components/base/Section'
import Top from 'components/misc/categoryList/Top'
import Instruction from 'components/misc/categoryList/Instruction'
import Bottom from 'components/misc/categoryList/Bottom'
import Checkbox from 'components/base/Checkbox'
import BarChart from 'components/charts/BarChart'

export default function Itinerary(props) {
  const { displayAll, setDisplayAll, start, end } = useContext(TransportContext)

  const itineraries = useItineraries(start, end)

  const transportations = useTransportations(itineraries)

  return (
    <Section>
      <Section.Content>
        {transportations.length ? (
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
          items={transportations}
          max={transportations[transportations.length - 1]?.value}
        />
        {transportations.length ? <Bottom category={props.category} /> : null}
      </Section.Content>
    </Section>
  )
}
