import React from 'react'
import styled from 'styled-components'

import Emoji from 'components/base/Emoji'

const Title = styled.h3`
  margin-bottom: 1rem;
  text-align: center;
`
const Sizes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Size = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.small ? 10 : props.large ? 13.375 : 12)}rem;
  height: ${(props) => (props.small ? 10 : props.large ? 13.375 : 12)}rem;
  margin: 0;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 50rem;
`
const StyledEmoji = styled(Emoji)`
  display: flex;
  align-items: flex-end;
  height: 2.5rem;
  margin-bottom: 0.5rem;
  font-size: ${(props) => (props.small ? 2 : props.large ? 4 : 3)}rem;
`
const Label = styled.span`
  display: block;
  margin-bottom: 0.5rem;
`
const Number = styled.span`
  display: block;
  font-size: 2.25rem;
  font-weight: bold;
  line-height: 1;
`
const Unit = styled.span`
  display: block;
  font-size: 0.75rem;
  font-weight: 300;
`
export default function Smartphone() {
  return (
    <>
      <Title>Impact de la taille de l’écran</Title>
      <Sizes>
        <Size small>
          <StyledEmoji small>📱</StyledEmoji>
          <Label>- de 4,5 pouces</Label>
          <Number>27,6</Number>
          <Unit>kg CO2e</Unit>
        </Size>
        <Size>
          <StyledEmoji>📱</StyledEmoji>
          <Label>5 pouces</Label>
          <Number>32,8</Number>
          <Unit>kg CO2e</Unit>
        </Size>
        <Size large>
          <StyledEmoji large>📱</StyledEmoji>
          <Label>+ de 5,5 pouces</Label>
          <Number>39,1</Number>
          <Unit>kg CO2e</Unit>
        </Size>
      </Sizes>
    </>
  )
}
