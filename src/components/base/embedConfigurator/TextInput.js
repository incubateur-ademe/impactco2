import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.input`
  position: relative;
  width: 100%;
  margin-bottom: 1em;
  padding: 0.8em 0.2em 0.8em 0.8em;
  font-size: 1.2em;
  color: ${(props) => props.theme.colors.main};
  background: none;
  border: 2px solid ${(props) => props.theme.colors.main};
  border-radius: 0.5rem;
  transition: box-shadow 300ms ease-out;

  &:focus {
    outline: none;
    box-shadow: inset 0px 0px 0px 0.1em ${(props) => props.theme.colors.main};
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.main};
    opacity: 0.5;
  }
`
export default function TextInput(props) {
  return (
    <Wrapper
      type={props.option.type}
      value={props.option.value}
      onChange={(e) => {
        props.option.setter(e.currentTarget.value)
      }}
      placeholder={props.option.label}
    />
  )
}
