import React from 'react'
import styled from 'styled-components'

import Emoji from 'components/base/Emoji'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0.5rem;
  padding: 1rem;
  text-align: center;
  background-color: ${(props) => props.theme.colors.footerLight};
  border-radius: 1rem;
`
const StyledEmoji = styled(Emoji)`
  margin-bottom: 1rem;
  font-size: 2.5rem;
`
const Title = styled.h2`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.text};
`
export default function Category(props) {
  return (
    <Wrapper>
      <StyledEmoji>{props.category.emoji}</StyledEmoji>
      <Title>{props.category.name.fr}</Title>
    </Wrapper>
  )
}
