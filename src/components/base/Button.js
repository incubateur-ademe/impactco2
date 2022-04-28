import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled(MagicLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8em 1.6em;
  font-size: ${(props) => (props.small ? '0.875em' : '1em')};
  text-align: center;
  text-decoration: none;
  color: ${(props) =>
    props.hollow
      ? props.theme.colors.main
      : props.theme.colors[
          props.theme.name === 'Défaut' ? 'background' : 'background'
        ]};
  background-color: ${(props) =>
    props.hollow ? 'transparent' : props.theme.colors.main};
  border: 1px solid ${(props) => props.theme.colors.main};
  border-radius: 1.5em;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'inherit')};
  cursor: pointer;
  transition: all 300ms ease-out;

  &:hover {
    background-color: ${(props) =>
      props.hollow ? props.theme.colors.main : props.theme.colors.main};
    color: ${(props) =>
      props.theme.colors[
        props.theme.name === 'Défaut' ? 'background' : 'background'
      ]};
  }

  &:focus {
    outline: none;
  }

  ${(props) => props.theme.mq.small} {
    font-size: 1em;
  }
`
export default function Button(props) {
  return (
    <Wrapper
      to={props.to}
      onClick={props.onClick}
      disabled={props.disabled}
      hollow={props.hollow}
      small={props.small}
      className={props.className}
      textColor={props.textColor}
      aria-label={props.children}
      noIcon
    >
      {props.children}
    </Wrapper>
  )
}

Button.Wrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.vertical ? 'column' : 'row')};
  justify-content: ${(props) =>
    props.left ? 'flex-start' : props.right ? 'flex-end' : 'center'};
  align-items: center;
  margin: 0 -0.5rem;

  > * {
    margin: 0 0.5rem ${(props) => (props.vertical ? '1rem' : '0')};
  }

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    margin: 0;

    > * {
      margin: 0 0 1rem;
    }
  }
`
