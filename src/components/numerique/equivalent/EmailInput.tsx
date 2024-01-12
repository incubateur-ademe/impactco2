import React from 'react'
import styled from 'styled-components'
import NetworkInput from './emailInput/NetworkInput'
import RecipientInput from './emailInput/RecipientInput'
import SizeInput from './emailInput/SizeInput'
import TypingInput from './emailInput/TypingInput'

const Wrapper = styled.div`
  background-color: var(--secondary-10);
  border: 0.0625rem solid var(--secondary-10);
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1.5rem;
`
export default function EmailInput() {
  return (
    <Wrapper>
      <SizeInput />
      <TypingInput name='email' />
      <RecipientInput name='email' />
      <NetworkInput name='email' />
    </Wrapper>
  )
}
