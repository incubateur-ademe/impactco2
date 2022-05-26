import React, { useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'utils/DataContext'
import Button from 'components/base/Button'
import Emoji from 'components/base/Emoji'

const Wrapper = styled.div`
  margin: 0 auto 3rem;
`
const Text = styled.p`
  font-weight: 300;
  text-align: center;
`
const StyledButton = styled(Button)`
  font-size: 0.875rem;
`
export default function Categories() {
  const { categories } = useContext(DataContext)
  return (
    <Wrapper>
      <Text>En panne d’inspiration ? Naviguez par catégories :</Text>
      <Button.Wrapper>
        {categories.map((category) => (
          <StyledButton to={`/categories/${category.slug}`}>
            <Emoji>{category.emoji}</Emoji>
            <span dangerouslySetInnerHTML={{ __html: '&nbsp&nbsp' }} />
            {category.name.fr}
          </StyledButton>
        ))}
      </Button.Wrapper>
    </Wrapper>
  )
}
