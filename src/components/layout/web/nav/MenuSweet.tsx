import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { categories } from 'components/providers/categories'
import Emoji from 'components/base/Emoji'
import Tag from 'components/misc/tag/Tag'
import DropdownSweet from './DropdownSweet'

const news: string[] = []

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`
const StyledEmoji = styled(Emoji)`
  font-size: 1.25rem;
  margin: 0.25rem 0.25rem 0 0;
`

export default function MenuSweet() {
  const router = useRouter()
  const slugs = router.asPath.split('/').filter((slug) => slug)

  return (
    <Wrapper>
      <DropdownSweet label={'Par thématique'}>
        {categories.map((category) => (
          <DropdownSweet.Item key={category.slug} href={`/${category.slug}`} $current={slugs.includes(category.slug)}>
            <div>
              <StyledEmoji>{category.emoji}</StyledEmoji> {category.name}
            </div>
            {news.includes(category.slug) && <Tag text='Nouveau' />}
          </DropdownSweet.Item>
        ))}
      </DropdownSweet>
    </Wrapper>
  )
}
