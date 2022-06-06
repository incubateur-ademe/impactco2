import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import Emoji from 'components/base/Emoji'

const Title = styled.h3`
  font-weight: normal;
  text-align: center;
`
const Equivalents = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
`
const Equivalent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => (props.large ? 12 : props.medium ? 10 : 7.5)}rem;
`
const Emojis = styled(Emoji)`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.75rem;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.large ? 70 : 100)}%;
  min-height: 5.625rem;
  margin: 0 auto 0.25rem;
  font-size: 2rem;
  text-align: center;
`
const Label = styled.div`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 300;

  strong {
    font-weight: normal;
  }
`
const Equals = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
`
const LinkWrapper = styled.div`
  width: 100%;
  text-align: center;
`
const StyledMagicLink = styled(MagicLink)`
  font-size: 0.875rem;
`
export default function Boeuf() {
  return (
    <>
      <Title>
        En terme d'émissions de CO2<sub>e</sub>
      </Title>
      <Equivalents>
        <Equivalent>
          <Emojis>📱</Emojis>
          <Label>
            produire
            <br />
            <strong>1 smartphone</strong>
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent medium>
          <Emojis large>🥩🥩🥩🥩</Emojis>
          <Label>
            consommer
            <br />
            <strong>4 repas avec du boeuf</strong>
          </Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent large>
          <Emojis large>👕👕👕👕👕</Emojis>
          <Label>
            fabriquer
            <br />
            <strong>5 t-shirts</strong>
          </Label>
        </Equivalent>
      </Equivalents>
      <LinkWrapper>
        <StyledMagicLink to='/co2e' className='noscreenshot'>
          Voir plus d'équivalences
        </StyledMagicLink>
      </LinkWrapper>
    </>
  )
}
