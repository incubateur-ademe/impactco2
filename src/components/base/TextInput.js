import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
`
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors[props.error ? 'error' : 'text']};
`
const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  color: ${(props) => props.theme.colors.text};
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.colors.text};
  border-radius: 1rem;
  transition: box-shadow 300ms ease-out;

  &:focus {
    outline: none;
    box-shadow: 0 -0 0px 1px ${(props) => props.theme.colors.text};
  }
`
export default function TextInput(props) {
  return (
    <Wrapper>
      {props.label && (
        <Label htmlFor={props.name} error={props.error}>
          {props.label}
        </Label>
      )}
      <Input
        type={props.type || 'text'}
        id={props.name}
        name={props.name}
        value={props.value}
        error={props.error}
        onChange={(e) => {
          props.onChange({ value: e.currentTarget.value, name: props.name })
        }}
      />
    </Wrapper>
  )
}
