import React from 'react'
import styled from 'styled-components'

import NumberInput from './co2Input/NumberInput'

const Wrapper = styled.div`
  margin-bottom: 2em;
`
const Sentence = styled.div`
  font-size: 1.45em;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    font-size: inherit;
  }
`
export default function CO2Input() {
  return (
    <Wrapper>
      <NumberInput />
      <Sentence>
        c’est autant d’émissions que pour
        <br />
        fabriquer, consommer ou parcourir :
      </Sentence>
    </Wrapper>
  )
}
