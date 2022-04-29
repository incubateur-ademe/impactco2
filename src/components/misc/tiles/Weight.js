import React from 'react'
import styled from 'styled-components'

import TextInput from 'components/base/TextInput'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0.5rem;
  font-size: 2rem;
  font-weight: bold;
`
const StyledTextInput = styled(TextInput)`
  position: relative;
  max-width: 10rem;
  margin-bottom: 0.625rem;

  input {
    font-weight: bold;
    text-align: right;
  }
`
const Unit = styled.span`
  padding: 0.625rem;
  line-height: 1.15;
`
export default function Weight(props) {
  return (
    <Wrapper>
      <StyledTextInput
        type='number'
        value={props.weight}
        onChange={(e) => props.setWeight(e.value)}
      />
      <Unit>
        kg CO<sub>2</sub>e
      </Unit>
    </Wrapper>
  )
}
