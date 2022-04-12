import React from 'react'
import styled from 'styled-components'

import Emoji from 'components/base/Emoji'
import Button from 'components/base/Button'

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
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`
const Title = styled.h2`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  min-height: 3rem;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.text};
`
const Value = styled.div`
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.second};
  line-height: 1.1;
`
const Number = styled.span`
  display: block;
  font-size: 2.25rem;
  font-weight: bold;
`
const Unit = styled.span`
  font-size: 0.875rem;
`
const Small = styled.span`
  font-size: 0.75rem;
`
const StyledButton = styled(Button)`
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
`
export default function Equivalent(props) {
  return (
    <Wrapper>
      <StyledEmoji>{props.equivalent.emoji}</StyledEmoji>
      <Title>
        1 {props.equivalent.name.fr.replaceAll('[s]', '').toLowerCase()}
      </Title>
      {false && (
        <Value>
          <Number>{props.equivalent.total}</Number>
          <Unit>
            <Small>kg</Small> CO2<Small>e</Small>
          </Unit>
        </Value>
      )}
      <StyledButton to={`/equivalents/${props.equivalent.slug}`} hollow>
        Voir le détail
      </StyledButton>
    </Wrapper>
  )
}
