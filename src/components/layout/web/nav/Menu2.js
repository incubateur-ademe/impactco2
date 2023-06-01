import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'components/providers/DataProvider'

import Emoji from 'components/base/Emoji'
import ThemeToggle2 from 'components/layout/web/header/ThemeToggle2.js'
import SearchBar2 from 'components/misc/search/SearchBar2'

import Dropdown from './menu/Dropdown'

const Wrapper = styled.nav`
  display: flex;
  justify-content: flex-end;
`
const StyledEmoji = styled(Emoji)`
  font-size: 1.25rem;
  margin: 0 0.25rem 0.25rem 0;
`
export default function Menu() {
  const { categories } = useContext(DataContext)

  const router = useRouter()
  const slugs = router.asPath.split('/').filter((slug) => slug)

  return (
    <Wrapper>
      <Dropdown
        label={'Catégories'}
        current={categories.find((category) => slugs.includes(category.slug))}
      >
        {categories
          ?.filter((category) => category.display)
          .map((category) => (
            <Dropdown.Item
              key={category.id}
              to={`/${category.slug}`}
              current={slugs.includes(category.slug)}
            >
              <StyledEmoji>{category.emoji}</StyledEmoji> {category.name}
            </Dropdown.Item>
          ))}
      </Dropdown>
      <Dropdown
        label={'Convertisseur'}
        to='/convertisseur'
        current={slugs.includes('convertisseur')}
      />
      <SearchBar2 />
      <ThemeToggle2 />
    </Wrapper>
  )
}
