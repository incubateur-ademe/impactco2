import React from 'react'
import styled from 'styled-components'

import NumberInput from './co2Input/NumberInput'

const Wrapper = styled.div`
  margin-bottom: 2em;
`
const Sentence = styled.div`
  margin-right: 11.1em;
  font-size: 1.45em;
  text-align: right;

  ${(props) => props.theme.mq.small} {
    margin-right: 0;
    font-size: inherit;
    text-align: left;
  }
`
const Spacer = styled.span`
  display: inline-block;
  width: 0.41em;
`
export default function CO2Input() {
  return (
    <Wrapper>
      <NumberInput />
      <Sentence>
        c’est autant d’émissions que pour
        <br />
        fabriquer, consommer ou parcourir :<Spacer />
      </Sentence>
    </Wrapper>
  )
}
