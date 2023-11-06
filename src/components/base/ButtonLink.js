import React from 'react'
import styled from 'styled-components'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled(MagicLink)`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.main};
  cursor: pointer;
  display: inline;
  font-style: inherit;
  font-weight: inherit;
  margin: 0;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  padding: 0;
  text-decoration: underline;

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
      aria-label={props.children}>
      {props.children}
    </Wrapper>
  )
}
