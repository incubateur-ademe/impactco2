import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: ${(props) => (props.checked ? props.color || 'var(--primary-50)' : 'transparent')};
  border: 0.125rem solid ${(props) => props.color || 'var(--primary-50)'};
  flex: 1;

  &:first-child {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  &:last-child {
    border-radius: 0 0.5rem 0.5rem 0;
  }

  input {
    cursor: pointer;
    height: 0;
    opacity: 0;
    position: absolute;
    width: 0;
  }
`
const Label = styled.label`
  align-items: center;
  color: ${(props) => (props.checked ? 'var(--neutral-00)' : props.color || 'var(--primary-50)')};
  cursor: pointer;
  display: flex;
  line-height: 1.15;
  padding: 0.5em 0.75em;
  position: relative;
  width: 100%;
`
export default function RadioInput(props) {
  return (
    <Wrapper color={props.color} checked={props.checked}>
      <input type='radio' id={props.id} name={props.name} value={props.value} onChange={props.onChange} />
      <Label htmlFor={props.id} checked={props.checked} color={props.color}>
        {props.label}
      </Label>
    </Wrapper>
  )
}
