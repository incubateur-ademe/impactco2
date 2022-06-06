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
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 2.5rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 300;
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
          <Emojis>📺</Emojis>
          <Label>1 télévision</Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent>
          <Emojis>💻💻💻</Emojis>
          <Label>3 ordinateurs portables</Label>
        </Equivalent>
        <Equals>=</Equals>
        <Equivalent large>
          <Emojis>📱📱📱📱📱📱📱📱📱📱📱📱📱</Emojis>
          <Label>13 smartphones</Label>
        </Equivalent>
      </Equivalents>
      <LinkWrapper>
        <StyledMagicLink to='/categories/numerique' className='noscreenshot'>
          Voir la catégorie numérique
        </StyledMagicLink>
      </LinkWrapper>
    </>
  )
}
