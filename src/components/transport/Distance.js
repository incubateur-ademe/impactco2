import React, { useContext } from 'react'
import { useTheme } from 'styled-components'

import useTransportations from 'hooks/useTransportations'
import TransportContext from './TransportProvider'
import Section from 'components/base/Section'
import Top from 'components/misc/categoryList/Top'
import Instruction from 'components/misc/categoryList/Instruction'
import CategoryLegend from 'components/misc/categoryList/CategoryLegend'
import Bottom from 'components/misc/categoryList/Bottom'
import Checkbox from 'components/base/Checkbox'
import BarChart from 'components/charts/BarChart'

export default function Distance(props) {
  const { displayAll, setDisplayAll, carpool, setCarpool } =
    useContext(TransportContext)

  const transportations = useTransportations()

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
      </Section.Content>
    </Section>
  )
}
