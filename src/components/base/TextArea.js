import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
`
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors[props.error ? 'error' : 'text']};
`
const Input = styled.textarea`
  width: 100%;
  padding: 0.5rem 1rem;

  color: ${(props) => props.theme.colors.text};
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  resize: vertical;
  transition: box-shadow 300ms ease-out;

  &:focus {
    outline: none;
    box-shadow: 0 -0 0px 1px ${(props) => props.theme.colors.second};
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
