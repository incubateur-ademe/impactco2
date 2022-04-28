import React, { useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'utils/DataContext'
import MagicLink from 'components/base/MagicLink'
import Emoji from 'components/base/Emoji'
import Dropdown from './menu/Dropdown'

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
const StyledEmoji = styled(Emoji)`
  margin: 0 0.25rem 0.25rem 0;
  font-size: 1.25rem;
`
export default function Menu() {
  const { categories } = useContext(DataContext)

  return (
    <Wrapper>
      <Dropdown
        label={'Catégories'}
        current={window.location.pathname.includes('/categories')}
      >
        {categories.map((category) => (
          <Dropdown.Item to={`/categories/${category.slug}`}>
            <StyledEmoji>{category.emoji}</StyledEmoji> {category.name.fr}
          </Dropdown.Item>
        ))}
      </Dropdown>
      <Dropdown
        label={'CO2e'}
        to='/co2e'
        current={window.location.pathname.includes('/co2')}
      />
    </Wrapper>
  )
}
