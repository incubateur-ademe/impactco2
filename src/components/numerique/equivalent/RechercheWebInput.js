import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import TypingInput from './emailInput/TypingInput'
import NetworkInput from './videoInput/NetworkInput'

const Wrapper = styled.div`
  background-color: var(--secondary-10);
  border: 0.0625rem solid var(--secondary-10);
  border-radius: 1rem;
  padding: 1.5rem;
  width: calc(50% - 1rem);

  ${MEDIA.LT.MEDIUM} {
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
