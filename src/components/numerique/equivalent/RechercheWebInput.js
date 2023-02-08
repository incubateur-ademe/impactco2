import React from 'react'
import styled from 'styled-components'

import TypingInput from './emailInput/TypingInput'
import NetworkInput from './videoInput/NetworkInput'

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  padding: 1.5rem;
  width: calc(50% - 1rem);

  ${(props) => props.theme.mq.medium} {
    width: 100%;
  }
`
export default function RechercheWebInput(props) {
  return (
    <Wrapper>
      <TypingInput name={props.name} />
      <NetworkInput name={props.name} />
    </Wrapper>
  )
}
