import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled(MagicLink)`
  display: inline;
  margin: 0;
  padding: 0;
  font-weight: inherit;
  font-style: inherit;
  color: ${(props) => props.theme.colors.main};
  text-decoration: underline;
  background: transparent;
  border: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: pointer;

  & sub {
    display: inline-block;
    text-decoration: none;
  }
`
export default function ButtonLink(props) {
  return (
    <Wrapper
      to={props.to}
      onClick={props.onClick}
      disabled={props.disabled}
      className={props.className}
      type={props.type}
      aria-label={props.children}
    >
      {props.children}
    </Wrapper>
  )
}
