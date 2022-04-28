import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.nav`
  display: flex;
  margin-left: -1.5rem;
`
const Item = styled(MagicLink)`
  position: relative;
  display: flex;
  align-items: center;
  height: 3rem;
  margin-right: 1.25rem;
  padding: 0 1.5rem;
  font-size: 0.875rem;
  text-decoration: none;
  color: ${(props) => props.theme.colors[props.current ? 'main' : 'text']};
  transition: background-color 200ms ease-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondLighter};
  }

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.125rem;
    background-color: ${(props) => props.theme.colors.main};
    opacity: ${(props) => (props.current ? 1 : 0)};
  }
`
export default function Menu() {
  return (
    <Wrapper>
      <Item
        to='/categories'
        current={window.location.pathname.includes('/categories')}
      >
        Catégories
      </Item>
      <Item to='/co2e' current={window.location.pathname.includes('/co2')}>
        CO<sub>2</sub>e
      </Item>
    </Wrapper>
  )
}
