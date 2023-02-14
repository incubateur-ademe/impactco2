import { useDroppable } from '@dnd-kit/core'
import React from 'react'
import styled from 'styled-components'

import TextInput from 'components/base/TextInput'

const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props) =>
    props.theme.colors[props.background ? 'textLight' : 'second']};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  justify-content: center;
  padding: 1.125rem 1.5rem 1.375rem;
  width: calc(33.3333% - 1rem);

  ${(props) => props.theme.mq.medium} {
    padding: 1.125rem 1rem 1.375rem;
    width: calc(33.3333% - 0.5rem);
  }
  ${(props) => props.theme.mq.small} {
    width: calc(50% - 0.375rem);
  }
`
const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 300;
  margin-bottom: 0.875rem;
  text-align: center;
`
const StyledTextInput = styled(TextInput)`
  display: block;
  margin-bottom: 0.5rem;
  position: relative;

  input {
    font-weight: bold;
    text-align: center;
  }
`
const Unit = styled.span`
  font-size: 1.5rem;
  line-height: 1.15;
`
const Small = styled.span`
  font-size: 0.625em;
`
export default function Weight(props) {
  const { setNodeRef } = useDroppable({
    id: 'weight',
  })

  return (
    <Wrapper background={props.background} ref={setNodeRef}>
      <Label htmlFor='co2'>
        Entrez une quantité de CO<sub>2</sub>e ci-dessous
      </Label>
      <StyledTextInput
        name='co2'
        type='number'
        value={props.weight}
        onChange={(e) => props.setWeight(e.value)}
      />
      <Unit>
        kg CO<sub>2</sub>
        <Small>e</Small>
      </Unit>
    </Wrapper>
  )
}
