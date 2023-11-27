import React, { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import formatName from 'utils/formatName'
import DataContext from 'components/providers/DataProvider'
import ModalContext from 'components/providers/ModalProvider'
import { Section, SectionWideContent } from 'components/base/Section'
import Legend from 'components/charts/Legend'
import StackedChart from 'components/charts/StackedChart'
import Detail from 'components/views/equivalent/ecv/Detail'
import RulesContextNumerique from './RulesProviderNumerique'
import Wrapper from './Wrapper'
import Bar from './equivalent/Bar'
import DeviceInput from './equivalent/DeviceInput'
import EmailInput from './equivalent/EmailInput'
import ExpertMode from './equivalent/ExpertMode'
import VideoInput from './equivalent/VideoInput'

export const StyledSection = styled(Section)`
  margin-bottom: 4rem;
`
export const Title = styled.h1``
const Questions = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin: 1rem 0;

  ${(props) => props.theme.mq.medium} {
    flex-direction: column;
  }
`
export default function Simulateur(props) {
  const { ecv } = useContext(DataContext)

  const { setEcv } = useContext(ModalContext)

  const { engine, situation } = useContext(RulesContextNumerique)

  const [construction, setConstruction] = useState(true)

  const ecvToDisplay = useMemo(
    () =>
      engine && ecv
        ? engine
            .evaluate(props.name)
            .traversedVariables.filter((variable) => ecv.find((item) => props.name + item.id === variable))
            .filter((variable) => construction || !variable.includes(' . terminaux . construction'))
            .map((variable) => {
              const step = ecv.find((item) => props.name + item.id === variable)
              return {
                id: step.name,
                color: step.color,
                label: step.name,
                value: engine.evaluate(variable).nodeValue,
                onClick: () => setEcv(step.id),
              }
            })
        : [],
    [ecv, engine, situation, construction]
  )

  const total = useMemo(() =>
    construction
      ? engine.evaluate(props.name).nodeValue
      : engine.evaluate(props.name).nodeValue - engine.evaluate(`${props.name} . terminaux . construction`).nodeValue
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
      <SectionWideContent>
        <Wrapper name={formatName(props.equivalent.name, 1, true)} slug={props.equivalent.slug}>
          <Bar total={total} equivalent={props.equivalent} category={props.category} name={props.name} />
          <StackedChart items={ecvToDisplay} total={total} />
          <Legend items={ecvToDisplay} />
          <Detail
            ecv={ecvToDisplay.map((ecv) => ({
              ...ecv,
              value: ecv.value / 1000,
            }))}
            total={total / 1000}
          />
          <Questions>
            {props.name === 'streaming' && (
              <>
                <DeviceInput construction={construction} setConstruction={setConstruction} name={props.name} />
                <VideoInput name={props.name} />
              </>
            )}
            {props.name === 'visio' && (
              <>
                <DeviceInput construction={construction} setConstruction={setConstruction} name={props.name} />
                <VideoInput name={props.name} />
              </>
            )}
            {props.name === 'email' && (
              <>
                <DeviceInput construction={construction} setConstruction={setConstruction} name={props.name} />
                <EmailInput name={props.name} />
              </>
            )}
            {props.name === 'recherche web' && (
              <>
                <DeviceInput construction={construction} setConstruction={setConstruction} name={props.name} />
              </>
            )}
          </Questions>
          <ExpertMode questions={questions} />
        </Wrapper>
      </SectionWideContent>
    </StyledSection>
  ) : null
}
