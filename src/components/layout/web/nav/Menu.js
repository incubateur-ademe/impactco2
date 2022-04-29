import React, { useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'utils/DataContext'
import Emoji from 'components/base/Emoji'
import Dropdown from './menu/Dropdown'

const Wrapper = styled.nav`
  display: flex;
  margin-left: -1.5rem;
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
          <Dropdown.Item
            key={category.id}
            to={`/categories/${category.slug}`}
            current={window.location.pathname.includes(category.slug)}
          >
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
