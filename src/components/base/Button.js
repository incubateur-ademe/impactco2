import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8em 1.6em;
  font-size: 1.2em;
  color: ${(props) =>
    props.hollow ? props.theme.colors.main : props.theme.colors.second};
  background-color: ${(props) =>
    props.hollow ? 'transparent' : props.theme.colors.main};
  border: 1px solid ${(props) => props.theme.colors.main};
  border-radius: 1em;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'inherit')};
  cursor: pointer;
  transition: all 300ms ease-out;

  &:hover {
    background-color: ${(props) =>
      props.hollow ? props.theme.colors.main : props.theme.colors.main};
    color: ${(props) => props.theme.colors.second};
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
