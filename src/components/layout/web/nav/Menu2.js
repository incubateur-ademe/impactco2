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
const SearchBar2Container = styled.div`
  max-width: 2rem;
`
const StyledEmoji = styled(Emoji)`
  font-size: 1.25rem;
  margin: 0 0.25rem 0.25rem 0;
`
const ShowMedium = styled.span`
  display: block;
  ${(props) => props.theme.mq.medium} {
    display: none;
  }
`
const ShowLarge = styled.span`
  display: block;
  ${(props) => props.theme.mq.large} {
    display: none;
  }
`
const ShowSmall = styled.span`
  display: block;
  ${(props) => props.theme.mq.small} {
    display: none;
  }
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
      <ShowLarge>
        <Dropdown
          label={'Convertisseur'}
          to='/convertisseur'
          current={slugs.includes('convertisseur')}
        />
      </ShowLarge>
      <ShowMedium>
        <SearchBar2Container>
          <SearchBar2 />
        </SearchBar2Container>
      </ShowMedium>
      <ShowSmall>
        <ThemeToggle2 />
      </ShowSmall>
    </Wrapper>
  )
}
