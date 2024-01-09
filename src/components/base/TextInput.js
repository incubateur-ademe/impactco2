import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
`
const Label = styled.label`
  color: ${(props) => (props.error ? 'var(--critical-50)' : 'var(--neutral-70)')};
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`
const Input = styled.input`
  background-color: transparent;
  border: 0.125rem solid ${(props) => (props.error ? 'var(--critical-50)' : 'var(--primary-50)')};
  border-radius: 0.625em;
  color: var(--neutral-70);
  padding: 0.5em 1em;
  width: 100%;

  &:focus {
    box-shadow: 0 -0 0px 1px var(--primary-50);
    outline: none;
  }
`
export default function TextInput(props) {
  return (
    <Wrapper className={props.className}>
      {props.label && (
        <Label htmlFor={props.name} error={props.error}>
          {props.label}
        </Label>
      )}
      <Input
        type={props.type || 'text'}
        id={props.name}
        data-testid={props['data-testid']}
        name={props.name}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        error={props.error}
        required={props.required}
        onChange={(e) => {
          props.onChange({ value: e.currentTarget.value, name: props.name })
        }}
      />
    </Wrapper>
  )
}
