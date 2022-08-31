import React, { useContext } from 'react'

import useItineraries from 'hooks/useItineraries'
import useTransportations from 'hooks/useTransportations'
import TransportContext from 'components/transport/TransportProvider'
import Section from 'components/base/Section'
import Wrapper from 'components/misc/Category/Wrapper'
import Top from 'components/misc/Category/Top'
import Instruction from 'components/misc/Category/Instruction'
import Bottom from 'components/misc/Category/Bottom'
import Checkbox from 'components/base/Checkbox'
import BarChart from 'components/charts/BarChart'
import Search from './Search'

export default function Itinerary(props) {
  const { displayAll, setDisplayAll, start, end } = useContext(TransportContext)

  const itineraries = useItineraries(start, end)

  const transportations = useTransportations(itineraries)

  return (
    <Section>
      <Section.Content>
        <Wrapper name={props.category.name.fr} slug={props.category.slug}>
          <Search itineraire iframe={props.iframe} />
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
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
