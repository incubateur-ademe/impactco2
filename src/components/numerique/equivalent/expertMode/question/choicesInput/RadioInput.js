import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'

const Wrapper = styled.div`
  border-right: 0.125rem solid var(--primary-50);

  &:last-child {
    border-right: none;
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
  background-color: ${(props) => (props.checked ? 'var(--primary-50)' : 'transparent')};
  color: ${(props) => (props.checked ? 'var(--neutral-00)' : 'var(--primary-50')};
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  gap: 0.75rem;
  line-height: 1.2;
  padding: 0.5rem 0.75rem;
  position: relative;

  ${MEDIA.LT.SMALL} {
    font-size: 1rem;
  }
`
export default function RadioInput(props) {
  return (
    <Wrapper>
      <input
        type='radio'
        id={props.id}
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
      <Label htmlFor={props.id} checked={props.checked}>
        {props.label}
      </Label>
    </Wrapper>
  )
}
