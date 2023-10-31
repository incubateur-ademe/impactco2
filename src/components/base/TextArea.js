import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
`
const Label = styled.label`
  color: ${(props) => props.theme.colors[props.error ? 'error' : 'text']};
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`
const Input = styled.textarea`
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.colors.main};

  border-radius: 1rem;
  color: ${(props) => props.theme.colors.text};
  padding: 0.5rem 1rem;
  resize: vertical;
  width: 100%;

  &:focus {
    box-shadow: 0 -0 0px 1px ${(props) => props.theme.colors.main};
    outline: none;
  }
`
export default function TextArea(props) {
  return (
    <Wrapper>
      {props.label && (
        <Label htmlFor={props.name} error={props.error}>
          {props.label}
        </Label>
      )}
      <Input
        rows='10'
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
