import React from 'react'
import styled from 'styled-components'

import Button from 'components/base/Button'
import Emoji from 'components/base/Emoji'

const Title = styled.h3`
  margin-bottom: 1rem;
  text-align: center;
`
const Equivalents = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  margin-bottom: 1.5rem;
`
const Equivalent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => (props.large ? 30 : 9)}rem;
`
const Emojis = styled(Emoji)`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 0.25rem;
  font-size: ${(props) => (props.large ? 10 : 1.5)}rem;
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
export default function Boeuf() {
  return (
    <>
      <Title>(Infographie non définitive)</Title>

      <Equivalents>
        <Equivalent>
          <Emojis>💧</Emojis>
          <Label>
            1 litre
            <br />
            d'eau en bouteille
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent>
          <Emojis large>💧</Emojis>
          <Label>
            3 432 litres
            <br />
            d'eau du robinet
          </Label>
        </Equivalent>
      </Equivalents>
      <Button.Wrapper>
        <StyledButton to='/categories/boisson'>
          Voir toutes les boissons
        </StyledButton>
      </Button.Wrapper>
    </>
  )
}
