import React from 'react'
import styled from 'styled-components'

import Emoji from 'components/base/Emoji'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12.75rem;
  margin: 0.75rem;
  padding: 1rem 0.25rem;
  background-color: ${(props) => props.theme.colors.secondLight};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    width: calc(50% - 0.75rem);
    margin: 0.375rem;
  }
`
const StyledEmoji = styled(Emoji)`
  margin-bottom: 0.5rem;
  font-size: 2rem;

  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
  }
`
const Title = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 3rem;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
`
const StyledButton = styled(Button)`
  padding: 0.375rem 1rem;
  font-size: 0.875rem;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
export default function Category(props) {
  return (
    <Wrapper background={props.background}>
      <StyledEmoji>{props.category.emoji}</StyledEmoji>
      <Title>{props.category.name.fr}</Title>

      <StyledButton to={`/categories/${props.category.slug}`}>
        Visualiser
      </StyledButton>
    </Wrapper>
  )
}
