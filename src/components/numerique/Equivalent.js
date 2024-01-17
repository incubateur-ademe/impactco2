import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import formatName from 'utils/formatName'
import { MEDIA } from 'utils/styles'
import useDataContext from 'components/providers/DataProvider'
import useModalContext from 'components/providers/ModalProvider'
import useParamContext from 'components/providers/ParamProvider'
import { Section, SectionWideContent } from 'components/base/Section'
import Legend from 'components/charts/Legend'
import StackedChart from 'components/charts/StackedChart'
import Detail from 'components/views/equivalent/ecv/Detail'
import Wrapper from './Wrapper'
import Bar from './equivalent/Bar'
import DeviceInput from './equivalent/DeviceInput'
import EmailInput from './equivalent/EmailInput'
import ExpertMode from './equivalent/ExpertMode'
import VideoInput from './equivalent/VideoInput'

const StyledSection = styled(Section)`
  margin-bottom: 4rem;
`
const Questions = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin: 1rem 0;

  ${MEDIA.LT.MEDIUM} {
    flex-direction: column;
  }
`
export default function Simulateur(props) {
  const { ecv } = useDataContext()

  const { setEcv } = useModalContext()

  const {
    [props.name]: { engine, situation, setSituation },
  } = useParamContext()

  const [construction, setConstruction] = useState(false)

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
    <StyledSection $withoutPadding>
      <SectionWideContent>
        <Wrapper name={formatName(props.equivalent.name, 1, true)} slug={props.equivalent.slug}>
          <Bar
            total={total}
            equivalent={props.equivalent}
            category={props.category}
            name={props.name}
            engine={engine}
          />
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
                <DeviceInput
                  engine={engine}
                  setSituation={setSituation}
                  construction={construction}
                  setConstruction={setConstruction}
                  name={props.name}
                />
                <VideoInput name={props.name} engine={engine} setSituation={setSituation} />
              </>
            )}
            {props.name === 'visio' && (
              <>
                <DeviceInput
                  engine={engine}
                  setSituation={setSituation}
                  construction={construction}
                  setConstruction={setConstruction}
                  name={props.name}
                />
                <VideoInput name={props.name} engine={engine} setSituation={setSituation} />
              </>
            )}
            {props.name === 'email' && (
              <>
                <DeviceInput
                  engine={engine}
                  setSituation={setSituation}
                  construction={construction}
                  setConstruction={setConstruction}
                  name={props.name}
                />
                <EmailInput engine={engine} setSituation={setSituation} />
              </>
            )}
            {props.name === 'recherche web' && (
              <>
                <DeviceInput
                  engine={engine}
                  setSituation={setSituation}
                  construction={construction}
                  setConstruction={setConstruction}
                  name={props.name}
                />
              </>
            )}
          </Questions>
          <ExpertMode questions={questions} />
        </Wrapper>
      </SectionWideContent>
    </StyledSection>
  ) : null
}
