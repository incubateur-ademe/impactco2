import { serializeUnit } from 'publicodes'
import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'

const Wrapper = styled.div`
  font-size: 1.25rem;
  ${MEDIA.LT.SMALL} {
    font-size: 1.125rem;
  }
`
const Input = styled.input`
  background-color: transparent;
  border: 0.125rem solid ${(props) => (props.error ? 'var(--critical-50)' : 'var(--primary-50)')};
  border-radius: 0.75rem;
  color: var(--neutral-70);
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  text-align: right;
  width: 7rem;
  &:focus {
    box-shadow: 0 -0 0px 1px var(--primary-50);
    outline: none;
  }
`
const Unit = styled.span``
export default function TextInput(props) {
  return (
    <Wrapper className={props.className}>
      <Input
        type={'text'}
        inputMode='numeric'
        id={props.rule.dottedName}
        name={props.rule.dottedName}
        value={props.value || 0}
        error={props.error}
        onChange={(e) => {
          props.onChange({
            [props.rule.dottedName]: Number(e.currentTarget.value) || 0,
          })
        }}
      />
      <Unit>{serializeUnit(props.evaluation.unit)}</Unit>
    </Wrapper>
  )
}
