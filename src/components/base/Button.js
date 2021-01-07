import React from 'react'
import styled from 'styled-components'

import { colors } from 'utils/styles'

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0.8em 1.6em;
  font-size: 1.2em;
  font-weight: 500;
  color: ${(props) => (props.hollow ? colors.main : colors.text)};
  background-color: ${(props) => (props.hollow ? 'transparent' : colors.main)};
  border: 1px solid ${colors.main};
  border-radius: 1em;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'inherit')};
  cursor: pointer;
  transition: all 300ms ease-out;

  &:hover {
    background-color: ${(props) => (props.hollow ? colors.main : colors.main)};
    color: ${colors.text};
  }

  &:focus {
    outline: none;
  }
`
export default function Button(props) {
  return (
    <Wrapper
      onClick={props.onClick}
      disabled={props.disabled}
      hollow={props.hollow}
    >
      {props.children}
    </Wrapper>
  )
}
