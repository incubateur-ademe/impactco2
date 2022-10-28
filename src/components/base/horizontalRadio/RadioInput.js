import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  flex: 1;
  background-color: ${(props) =>
    props.checked ? props.color || props.theme.colors.main : 'transparent'};
  border: 0.125rem solid ${(props) => props.color || props.theme.colors.main};

  &:first-child {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  &:last-child {
    border-radius: 0 0.5rem 0.5rem 0;
  }

  input {
    position: absolute;
    height: 0;
    width: 0;
    opacity: 0;
    cursor: pointer;
  }
`
const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5em 0.75em;
  color: ${(props) =>
    props.checked
      ? props.theme.colors.background
      : props.color || props.theme.colors.main};
  line-height: 1.15;

  cursor: pointer;
  transition: all 300ms ease-out;
`
export default function RadioInput(props) {
  return (
    <Wrapper color={props.color} checked={props.checked}>
      <input
        type='radio'
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
      <Label htmlFor={props.id} checked={props.checked} color={props.color}>
        {props.label}
      </Label>
    </Wrapper>
  )
}
