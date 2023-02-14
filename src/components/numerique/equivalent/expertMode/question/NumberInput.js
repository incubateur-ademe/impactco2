import { serializeUnit } from 'publicodes'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-size: 1.25rem;
  ${(props) => props.theme.mq.small} {
    font-size: 1.125rem;
  }
`
const Input = styled.input`
  background-color: transparent;
  border: 0.125rem solid
    ${(props) => props.theme.colors[props.error ? 'error' : 'main']};
  border-radius: 0.75rem;
  color: ${(props) => props.theme.colors.text};
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  text-align: right;
  transition: box-shadow 300ms ease-out;
  width: 7rem;
  &:focus {
    box-shadow: 0 -0 0px 1px ${(props) => props.theme.colors.main};
    outline: none;
  }
`
const Unit = styled.span``
export default function TextInput(props) {
  return (
    <Wrapper className={props.className}>
      <Input
        type={'text'}
        inputmode='numeric'
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
