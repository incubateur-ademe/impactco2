import React, { useContext } from 'react'

import useTransportations from 'hooks/useTransportations'
import TransportContext from './TransportProvider'
import Section from 'components/base/Section'
import Wrapper from 'components/misc/Category/Wrapper'
import Top from 'components/misc/Category/Top'
import Instruction from 'components/misc/Category/Instruction'
import CategoryLegend from 'components/misc/Category/CategoryLegend'
import Bottom from 'components/misc/Category/Bottom'
import Checkbox from 'components/base/Checkbox'
import BarChart from 'components/charts/BarChart'
import Search from './Search'

export default function Distance(props) {
  const { displayAll, setDisplayAll, carpool, setCarpool } =
    useContext(TransportContext)

  const transportations = useTransportations()

  return (
    <Section>
      <Section.Content>
        <Wrapper name={props.category.name.fr} slug={props.category.slug}>
          <Search distance />
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
                  Afficher tous les modes de transport
                </Checkbox>
                <Checkbox
                  name='carpool'
                  checked={carpool}
                  onChange={() => {
                    setCarpool((prevCarpool) => (prevCarpool ? 0 : 2))
                    window?._paq?.push([
                      'trackEvent',
                      'Interaction',
                      'Covoiturage',
                    ])
                  }}
                >
                  Afficher le covoiturage
                </Checkbox>
              </Top.Checkboxes>
            </Top>
          ) : null}
          <BarChart
            items={transportations}
            max={transportations[transportations.length - 1]?.value}
          />
          {transportations.length && (
            <>
              <CategoryLegend />
              <Bottom category={props.category} />
            </>
          )}
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
