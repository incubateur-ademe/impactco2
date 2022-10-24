import React, { useContext } from 'react'

import useTransportations from 'hooks/useTransportations'
import TransportContext from './TransportProvider'
import Section from 'components/base/Section'
import Wrapper from 'components/misc/category/Wrapper'
import Top from 'components/misc/category/Top'
import Instruction from 'components/misc/category/Instruction'
import CategoryLegend from 'components/misc/category/CategoryLegend'
import Bottom from 'components/misc/category/Bottom'
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
        <Wrapper
          name={props.category.title || props.category.name}
          slug={props.category.slug}
        >
          <Search distance iframe={props.iframe} />
          {transportations.length ? (
            <Top className='noscreenshot'>
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
                      props.category.name,
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
              <Bottom category={props.category} iframe={props.iframe} />
            </>
          )}
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
