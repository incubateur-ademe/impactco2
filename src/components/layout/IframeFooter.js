import React from 'react'
import styled from 'styled-components'

import ademe from './footer/ademe.jpg'
import repufrancaise from './footer/repufrancaise.jpg'

import Button from 'components/base/Button'
import MagicLink from 'components/base/MagicLink'
import Logo from 'components/base/Logo'

const Wrapper = styled.div`
  position: relative;
  background-color: white;
`
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 3vw;
  padding: 1em 0;

  ${(props) => props.theme.mq.small} {
    flex-direction: column-reverse;
  }
`
const LogosWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 1rem 0 0;

  ${(props) => props.theme.mq.small} {
    margin: 1rem 0 0;
  }
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

export default function Footer(props) {
  return (
    <Wrapper>
      <Content>
        <LogosWrapper>
          <Logos to='https://datagir.ademe.fr/'>
            <Institution src={repufrancaise} alt='République Française' />
            <Institution src={ademe} alt='ADEME' />
            <Logo />
          </Logos>
        </LogosWrapper>
        {props.about && (
          <Button to={props.about}>En savoir plus sur ce simulateur</Button>
        )}
      </Content>
    </Wrapper>
  )
}
