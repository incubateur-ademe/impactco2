import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { formatName, formatNumber, formatTotal } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import RulesContext from './RulesProvider'
import Section from 'components/base/Section'
import Emoji from 'components/base/Emoji'
import StackedChart from 'components/charts/StackedChart'
import Legend from 'components/charts/Legend'
import Detail from 'components/views/equivalent/ecv/Detail'
import Wrapper from './Wrapper'
import Question from './Question'
import DeviceInput from './question/DeviceInput'
import VideoInput from './question/VideoInput'
import EmailInput from './question/EmailInput'

export const StyledSection = styled(Section)`
  margin-bottom: 4rem;
`
export const Title = styled.h1``
const Bar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0.5rem 0;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: -2000rem;
    right: -2000rem;
    background-color: ${(props) => props.theme.colors.main};
  }
`
const Top = styled.div`
  position: relative;
  color: ${(props) => props.theme.colors.background};
  border-radius: 1rem 1rem 0 0;
  transition: padding 300ms ease-out, margin 300ms ease-out;
`
const Number = styled.span`
  font-size: 3.75rem;
  font-weight: bold;

  ${(props) => props.theme.mq.small} {
    font-size: 3rem;
  }
`
const Unit = styled.span`
  font-size: 1rem;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
const Big = styled.span`
  font-size: 1.25rem;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
const StyledEmoji = styled(Emoji)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.5rem;
  height: 4.5rem;
  margin-top: 0.325rem;
  font-size: 3rem;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 5.25rem;

  ${(props) => props.theme.mq.small} {
    width: 3.25rem;
    height: 3.25rem;
    font-size: 2rem;
  }
`
const Questions = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1rem;

  ${(props) => props.theme.mq.medium} {
    flex-direction: column;
  }
`
export default function Simulateur(props) {
  const { ecv } = useContext(DataContext)

  const { engine, situation, setSituation } = useContext(RulesContext)

  const ecvToDisplay = useMemo(
    () =>
      engine && ecv
        ? engine
            .evaluate(props.name)
            .traversedVariables.filter((variable) =>
              ecv.find((item) => props.name + item.id === variable)
            )
            .map((variable) => {
              const step = ecv.find((item) => props.name + item.id === variable)
              return {
                color: step.color,
                label: step.name,
                value: engine.evaluate(variable).nodeValue,
              }
            })
        : [],
    [ecv, engine, situation, props.formatNumber]
  )

  const questions = useMemo(
    () =>
      engine
        ? engine &&
          engine
            .evaluate(props.name)
            .traversedVariables.map((variable) => engine.getRule(variable))
            .filter((rule) => rule.rawNode.question !== undefined)
        : [],
    [engine, situation, props.name]
  )

  return engine ? (
    <StyledSection>
      <Section.Content>
        <Wrapper
          name={formatName(props.equivalent.name, 1, true)}
          slug={props.equivalent.slug}
        >
          <Bar>
            <Top>
              <Number>
                {formatNumber(engine.evaluate(props.name).nodeValue)}
              </Number>{' '}
              <Unit>
                g <Big>CO2</Big>e{' '}
                {(props.equivalent.unit || props.category.unit) && (
                  <>/ {props.equivalent.unit || props.category.unit}</>
                )}
              </Unit>
            </Top>
            <StyledEmoji>{props.equivalent.emoji}</StyledEmoji>
          </Bar>
          <StackedChart
            items={ecvToDisplay}
            total={formatTotal(props.equivalent)}
          />
          <Legend items={ecvToDisplay} />
          <Detail
            ecv={ecvToDisplay.map((ecv) => ({
              ...ecv,
              value: ecv.value / 1000,
            }))}
            total={engine.evaluate(props.name).nodeValue / 1000}
          />
          <Questions>
            {props.name === 'streaming' && (
              <>
                <DeviceInput name={props.name} />
                <VideoInput name={props.name} />
              </>
            )}
            {props.name === 'visio' && (
              <>
                <DeviceInput name={props.name} />
                <VideoInput name={props.name} />
              </>
            )}
            {props.name === 'mails' && (
              <>
                <DeviceInput name={props.name} />
                <EmailInput name={props.name} />
              </>
            )}
          </Questions>
          <Questions>
            {questions.map((question) => (
              <Question
                key={question.dottedName}
                rule={question}
                evaluation={engine.evaluate(question.dottedName)}
                value={engine.evaluate(question.dottedName).nodeValue}
                onChange={setSituation}
              />
            ))}
          </Questions>
        </Wrapper>
      </Section.Content>
    </StyledSection>
  ) : null
}
