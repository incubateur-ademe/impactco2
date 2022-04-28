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
  width: ${(props) => (props.large ? 17 : 7.5)}rem;
`
const Emojis = styled(Emoji)`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  justify-content: center;
  align-items: center;
  min-height: 5.625rem;
  margin-bottom: 0.25rem;
  font-size: 2rem;
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
      <Equivalents>
        <Equivalent>
          <Emojis>🥩</Emojis>
          <Label>
            1 repas avec
            <br />
            du boeuf
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent>
          <Emojis>🍗🍗🍗🍗🍗</Emojis>
          <Label>
            5 repas avec
            <br />
            du poulet
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent large>
          <Emojis>🥗🥗🥗🥗🥗🥗🥗🥗🥗🥗🥗🥗🥗🥗</Emojis>
          <Label>
            14 repas
            <br />
            végétariens
          </Label>
        </Equivalent>
      </Equivalents>
      <Button.Wrapper>
        <StyledButton to='/categories/repas'>Voir tous les repas</StyledButton>
      </Button.Wrapper>
    </>
  )
}
