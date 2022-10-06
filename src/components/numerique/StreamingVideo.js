import React, { useContext } from 'react'
import styled from 'styled-components'

import {
  formatName,
  formatNumberPrecision,
  formatTotal,
} from 'utils/formatters'
import RulesContext from './RulesProvider'
import Section from 'components/base/Section'
import ScreenshotWrapper from 'components/misc/ScreenshotWrapper'
import StackedChart from 'components/charts/StackedChart'
import Legend from 'components/charts/Legend'

export const StyledSection = styled(Section)`
  margin-bottom: 4rem;
`
export const Title = styled.h3`
  font-weight: normal;
  text-align: center;
`
export default function Email(props) {
  const { engine, setSituation } = useContext(RulesContext)

  console.log(
    engine
      ? engine
          .evaluate('streaming')
          .traversedVariables.filter(
            (variable) =>
              engine.evaluate(variable).traversedVariables.length === 1 &&
              !engine.getRule(variable).rawNode.question
          )
          .map((variable) => engine.evaluate(variable))
      : /*    .map((variable) => ({
            color: '#ab616f',
            label: variable.title,
            name: variable.title,
            value: variable.nodeValue,
          }))*/
        'nope'
  )
  console.log(engine ? engine.evaluate('streaming . transmission') : null)

  return engine ? (
    <StyledSection>
      <Section.Content>
        <ScreenshotWrapper equivalent={props.equivalent}>
          <Title>
            Détail de l&apos;empreinte de une{' '}
            {props.equivalent.prefix && (
              <>{formatName(props.equivalent.prefix)} </>
            )}
            {formatName(props.equivalent.name, 1)} (
            {formatNumberPrecision(engine.evaluate('streaming').nodeValue)}{' '}
            <span>
              CO
              <sub>2</sub>e
            </span>
            )
          </Title>
          {/*<StackedChart
            items={ecvToDisplay}
            total={formatTotal(props.equivalent, usage)}
          />
          <Legend items={ecvToDisplay} />*/}
        </ScreenshotWrapper>
      </Section.Content>
    </StyledSection>
  ) : null
}
