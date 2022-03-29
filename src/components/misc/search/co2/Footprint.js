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
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text};
`
const Description = styled.p``
export default function Footprint(props) {
  return (
    <Wrapper>
      <StyledEmoji>{props.footprint.emoji}</StyledEmoji>
      <Title>{props.footprint.name.fr}</Title>
      <Description>{props.footprint.description}</Description>
    </Wrapper>
  )
}
