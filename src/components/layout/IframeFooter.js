import React from 'react'
import styled from 'styled-components'

import ademe from './footer/ademe.jpg'
import repufrancaise from './footer/repufrancaise.jpg'

import Button from 'components/base/Button'
import MagicLink from 'components/base/MagicLink'
import Logo from 'components/base/Logo'
import MobileButtons from './footer/MobileButtons'

const Wrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.second};
`
const Content = styled.div`
  max-width: 37rem;
  margin: 0 auto;
  padding: 1rem 0.5rem 0.5rem;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 1rem;
`
const LogosWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Logos = styled(MagicLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-decoration: none;
  background-color: white;
`
const Institution = styled.img`
  display: block;
  height: 5.625em;
`

export default function Footer() {
  return (
    <Wrapper>
      <Content>
        <MobileButtons iframe />
        <ButtonWrapper>
          <Button to={process.env.REACT_APP_URL}>
            En savoir plus sur ce simulateur
          </Button>
        </ButtonWrapper>
      </Content>
      <LogosWrapper>
        <Logos to='https://datagir.ademe.fr/'>
          <Institution src={repufrancaise} alt='République Française' />
          <Institution src={ademe} alt='ADEME' />
          <Logo />
        </Logos>
      </LogosWrapper>
    </Wrapper>
  )
}
