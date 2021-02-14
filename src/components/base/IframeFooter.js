import React from 'react'
import styled from 'styled-components'

import ademe from './footer/ademe.jpg'
import repufrancaise from './footer/repufrancaise.jpg'

import Button from 'components/base/Button'

const Wrapper = styled.div`
  position: relative;
  background-color: white;
`
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${(props) => props.width || '40em'};
  margin: 0 auto;
  padding: 1em 0;

  ${(props) => props.theme.mq.small} {
    max-width: none;
    margin: 0 3vw;
  }
`
const Logos = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
`
const Logo = styled.img`
  width: 4em;

  ${(props) => props.theme.mq.small} {
    width: 3em;
  }
`

export default function Footer(props) {
  return (
    <Wrapper>
      <Content>
        <Logos>
          <Logo src={repufrancaise} alt='République Française' />
          <Logo src={ademe} alt='ADEME' />
        </Logos>
        {props.about && (
          <Button href={props.about}>En savoir plus sur ce simulateur</Button>
        )}
      </Content>
    </Wrapper>
  )
}
