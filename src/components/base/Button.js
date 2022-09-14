import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled(MagicLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => (props.small ? '0.375em' : '0.5em')};
  padding: 0.5em 1.5em;
  font-size: ${(props) => (props.small ? '0.875em' : '1em')};
  text-align: center;
  line-height: 1.2;
  text-decoration: none;
  color: ${(props) => props.theme.colors[props.hollow ? 'main' : 'background']};
  background-color: ${(props) =>
    props.hollow ? 'transparent' : props.theme.colors.main};
  border: 0.125rem solid ${(props) => props.theme.colors.main};
  border-radius: 1.5rem;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'inherit')};
  cursor: pointer;
  transition: all 300ms ease-out;

  path {
    transition: all 300ms ease-out;
    fill: ${(props) =>
      props.theme.colors[props.hollow ? 'main' : 'background']};
  }

  &:hover,
  &:focus {
    outline: none;
    background-color: ${(props) =>
      props.hollow ? props.theme.colors.main : 'transparent'};
    color: ${(props) =>
      props.theme.colors[props.hollow ? 'background' : 'main']};

    path {
      fill: ${(props) =>
        props.theme.colors[props.hollow ? 'background' : 'main']};
    }
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
      type={props.type}
      aria-label={props.children}
      noIcon
    >
      {props.children}
    </Wrapper>
  )
}

Button.Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.vertical ? 'column' : 'row')};
  justify-content: ${(props) =>
    props.left
      ? 'flex-start'
      : props.right
      ? 'flex-end'
      : props.spacebetween
      ? 'space-between'
      : 'center'};
  align-items: center;
  gap: 1rem;
`
