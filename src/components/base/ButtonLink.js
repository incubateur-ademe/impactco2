import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled(MagicLink)`
  display: inline;
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.colors.main};
  text-decoration: underline;
  background: transparent;
  border: none;
  cursor: pointer;
`
export default function ButtonLink(props) {
  return (
    <Wrapper
      to={props.to}
      onClick={props.onClick}
      disabled={props.disabled}
      className={props.className}
      aria-label={props.children}
    >
      {props.children}
    </Wrapper>
  )
}
