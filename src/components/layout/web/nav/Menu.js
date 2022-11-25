import React, { useContext } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import DataContext from 'components/providers/DataProvider'
import Emoji from 'components/base/Emoji'
import Dropdown from './menu/Dropdown'
import categories from 'data/categories.json'
import { independantCategories } from '../../../../../pages/[category]'

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

  const router = useRouter()
  const pathnames = independantCategories
    .map((id) => {
      return `/${categories.find((category) => category.id === id).slug}`
    })
    .concat(['/[category]'])

  return (
    <Wrapper>
      <Dropdown
        label={'Catégories'}
        current={pathnames.includes(router.pathname)}
      >
        {categories &&
          categories
            .filter((category) => category.display)
            .map((category) => (
              <Dropdown.Item
                key={category.id}
                to={`/${category.slug}`}
                current={router.asPath.split('/')[1] === category.slug}
              >
                <StyledEmoji>{category.emoji}</StyledEmoji> {category.name}
              </Dropdown.Item>
            ))}
      </Dropdown>
      <Dropdown
        label={'Convertisseur'}
        to='/convertisseur'
        current={router.pathname.includes('/convertisseur')}
      />
    </Wrapper>
  )
}
