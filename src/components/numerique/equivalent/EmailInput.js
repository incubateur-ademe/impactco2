import React from 'react'
import styled from 'styled-components'

import SizeInput from './emailInput/SizeInput'
import TypingInput from './emailInput/TypingInput'
import RecipientInput from './emailInput/RecipientInput'
import NetworkInput from './emailInput/NetworkInput'

const Wrapper = styled.div`
  width: calc(50% - 1rem);
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;

  ${(props) => props.theme.mq.medium} {
    width: 100%;
  }
`
export default function EmailInput(props) {
  return (
    <Wrapper>
      <SizeInput name={props.name} />
      <TypingInput name={props.name} />
      <RecipientInput name={props.name} />
      <NetworkInput name={props.name} />
    </Wrapper>
  )
}
