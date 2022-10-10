import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { formatName, formatNumber, formatTotal } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import RulesContext from './RulesProvider'
import Section from 'components/base/Section'
import ScreenshotWrapper from 'components/misc/ScreenshotWrapper'
import StackedChart from 'components/charts/StackedChart'
import Legend from 'components/charts/Legend'
import Detail from 'components/views/equivalent/ecv/Detail'
import Question from './Question'

export const StyledSection = styled(Section)`
  margin-bottom: 4rem;
`
export const Title = styled.h1`
  display: flex;
  justify-content: space-between;
  text-align: center;
`
export default function Email(props) {
  const { ecv } = useContext(DataContext)

  const { engine, situation, setSituation } = useContext(RulesContext)

  const ecvToDisplay = useMemo(
    () =>
      engine
        ? engine
            .evaluate('streaming')
            .traversedVariables.filter((variable) =>
              ecv.find((item) => item.id === variable)
            )
            .map((variable) => {
              const step = ecv.find((item) => item.id === variable)
              return {
                color: step.color,
                label: step.name,
                value: engine.evaluate(variable).nodeValue,
              }
            })
        : 'nope',
    [ecv, engine, situation]
  )

  const questions = useMemo(
    () =>
      engine
        ? Object.entries(engine.publicParsedRules).filter(
            (rule) => rule[1].rawNode.question !== undefined
          )
        : [],
    [engine, situation]
  )

  return engine ? (
    <StyledSection>
      <Section.Content>
        <ScreenshotWrapper equivalent={props.equivalent}>
          <Title>
            <span>{formatName(props.equivalent.name, 1, true)}</span>
            <span>
              {formatNumber(engine.evaluate('streaming').nodeValue)}{' '}
              <span>
                g CO
                <sub>2</sub>e
              </span>
            </span>
          </Title>
          {questions.map((question) => (
            <Question
              key={question[0]}
              rule={question[1]}
              evaluation={engine.evaluate(question[0])}
              value={engine.evaluate(question[0]).nodeValue}
              onChange={setSituation}
            />
          ))}
          <StackedChart
            items={ecvToDisplay}
            total={formatTotal(props.equivalent)}
          />
          <Legend items={ecvToDisplay} />
          <Detail ecv={ecvToDisplay} total={formatTotal(props.equivalent)} />
        </ScreenshotWrapper>
      </Section.Content>
    </StyledSection>
  ) : null
}
