import React, { useContext } from 'react'
import styled from 'styled-components'

import RulesContext from 'components/numerique/RulesProvider'
import Slider from 'components/base/Slider'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  text-align: center;
`
const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 19rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0.75rem;
  border: 0.125rem solid ${(props) => props.theme.colors.main};
  border-radius: 0.5rem;
`
const Duration = styled.div`
  width: 6rem;
  text-align: right;
`
export default function DurationInput(props) {
  const { engine, setSituation } = useContext(RulesContext)

  return (
    <Wrapper>
      <Label>
        Durée de la {props.name === 'streaming' ? 'vidéo' : 'communication'}
      </Label>
      <SliderWrapper>
        <Slider
          value={engine.evaluate(`${props.name} . durée`).nodeValue}
          min={1}
          max={600}
          onChange={(value) =>
            setSituation({
              [`${props.name} . durée`]: value,
            })
          }
        />
        <Duration>
          {engine.evaluate(`${props.name} . durée`).nodeValue} minutes
        </Duration>
      </SliderWrapper>
    </Wrapper>
  )
}
