import React from 'react'
import styled from 'styled-components'

import Button from 'components/base/Button'
import Emoji from 'components/base/Emoji'

const Equivalents = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
`
const Equivalent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => (props.large ? 19 : 5)}rem;
`
const Emojis = styled(Emoji)`
  display: inline-flex;
  flex-wrap: wrap;
  gap: ${(props) => (props.small ? 0.125 : 0.375)}rem;
  justify-content: center;
  align-items: center;
  min-height: 5.625rem;
  margin-bottom: 0.25rem;
  font-size: ${(props) => (props.small ? 0.875 : 2)}rem;
  text-align: center;
`
const Label = styled.div`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 300;
`
const Equals = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
`
const StyledButton = styled(Button)`
  font-size: 0.875rem;
`
export default function Voiture() {
  return (
    <>
      <Equivalents>
        <Equivalent>
          <Emojis>🚗</Emojis>
          <Label>
            <strong>1 km</strong>
            <br />
            en voiture
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent>
          <Emojis>🚌🚌</Emojis>
          <Label>
            <strong>2 km</strong>
            <br />
            en bus
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent large>
          <Emojis small>
            🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅🚅
          </Emojis>
          <Label>
            <strong>112 km</strong>
            <br />
            en TGV
          </Label>
        </Equivalent>
      </Equivalents>
      <Button.Wrapper>
        <StyledButton to='/categories/deplacement'>
          Voir tous les modes de transport
        </StyledButton>
      </Button.Wrapper>
    </>
  )
}
