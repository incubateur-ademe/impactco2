import React, { useContext } from 'react'
import { formatName } from 'utils/formatters'
import useTransportations from 'hooks/useTransportations'
import Checkbox from 'components/base/Checkbox'
import Section from 'components/base/Section'
import BarChart from 'components/charts/BarChart'
import Bottom from 'components/misc/category/Bottom'
import CategoryLegend from 'components/misc/category/CategoryLegend'
import Instruction from 'components/misc/category/Instruction'
import Top from 'components/misc/category/Top'
import Wrapper from 'components/misc/category/Wrapper'
import Search from './Search'
import TransportContext from './TransportProvider'

export default function Distance(props) {
  const { displayAll, setDisplayAll, carpool, setCarpool } = useContext(TransportContext)

  const transportations = useTransportations()

  return (
    <Section>
      <Section.Content>
        <Wrapper name={props.category.title || props.category.name} slug={props.category.slug}>
          <Search distance iframe={props.iframe} />
          {transportations.length ? (
            <Top className='noscreenshot'>
              <Instruction title={props.category.equivalent} gender={props.category.gender} />
              <Top.Checkboxes $visible>
                <Checkbox
                  name='displayAll'
                  checked={displayAll}
                  onChange={() => {
                    setDisplayAll((prevDisplayAll) => !prevDisplayAll)
                    window?.please?.track([
                      'trackEvent',
                      'Interaction',
                      'Voir tous les équivalents',
                      props.category.name,
                    ])
                  }}>
                  Voir {props.category.gender === 'f' ? 'toutes' : 'tous'} les{' '}
                  {formatName(props.category.equivalent, 2) || 'équivalents'}
                </Checkbox>
                <Checkbox
                  name='carpool'
                  checked={carpool}
                  onChange={() => {
                    setCarpool((prevCarpool) => (prevCarpool ? 0 : 2))
                    window?.please?.track(['trackEvent', 'Interaction', 'Covoiturage'])
                  }}>
                  Afficher le covoiturage
                </Checkbox>
              </Top.Checkboxes>
            </Top>
          ) : null}
          <BarChart items={transportations} max={transportations[transportations.length - 1]?.value} />
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
