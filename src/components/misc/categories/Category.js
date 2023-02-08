import React from 'react'
import styled from 'styled-components'

import Emoji from 'components/base/Emoji'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.25rem;
  position: relative;
  width: calc(33.3333% - 1rem);

  ${(props) => props.theme.mq.small} {
    width: calc(50% - 0.5rem);
  }
`
const StyledEmoji = styled(Emoji)`
  font-size: 2rem;
  margin-bottom: 0.5rem;

  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
  }
`
const Title = styled.h4`
  align-items: center;
  color: ${(props) => props.theme.colors.text};
  display: flex;
  font-size: 1.25rem;
  font-weight: normal;
  justify-content: center;
  margin-bottom: 0.5rem;
  min-height: 3rem;
  text-align: center;
`
const StyledButton = styled(Button)`
  font-size: 0.875rem;
  padding: 0.375rem 1rem;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
export default function Category(props) {
  return (
    <Wrapper>
      <StyledEmoji>{props.category.emoji}</StyledEmoji>
      <Title>{props.category.name}</Title>

      <StyledButton to={`/${props.category.slug}`}>Visualiser</StyledButton>
    </Wrapper>
  )
}
