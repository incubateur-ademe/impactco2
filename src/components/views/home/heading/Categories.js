import React, { useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'components/providers/DataProvider'

import Button from 'components/base/Button'
import Emoji from 'components/base/Emoji'

const Wrapper = styled.div`
  margin: 0 auto 2rem;
  max-width: 40rem;
`
const Text = styled.p`
  font-weight: 300;
  text-align: center;
`
export default function Categories() {
  const { categories } = useContext(DataContext)
  return (
    <Wrapper>
      <Text>En panne d’inspiration ? Naviguez par catégories :</Text>
      <Button.Wrapper>
        {categories
          .filter((category) => category.display)
          .map((category) => (
            <Button
              key={category.slug}
              to={`/${category.slug}`}
              small
              onClick={() =>
                window?._paq?.push([
                  'trackEvent',
                  'Interaction',
                  'Suggestion',
                  category.name,
                ])
              }
            >
              <Emoji>{category.emoji}</Emoji>
              {category.name}
            </Button>
          ))}
      </Button.Wrapper>
    </Wrapper>
  )
}
