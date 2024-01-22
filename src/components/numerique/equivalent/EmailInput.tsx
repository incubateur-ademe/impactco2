import Engine, { ASTNode, PublicodesExpression } from 'publicodes'
import { Dispatch, SetStateAction } from 'react'
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
export default function EmailInput({
  engine,
  setSituation,
}: {
  engine: Engine
  setSituation: Dispatch<SetStateAction<Partial<Record<string, PublicodesExpression | ASTNode>>>>
}) {
  return (
    <Wrapper>
      <SizeInput engine={engine} setSituation={setSituation} />
      <TypingInput name='email' engine={engine} setSituation={setSituation} />
      <RecipientInput name='email' engine={engine} setSituation={setSituation} />
      <NetworkInput name='email' engine={engine} setSituation={setSituation} />
    </Wrapper>
  )
}
