import React from 'react'
import styled from 'styled-components'

import Header from 'components/layout/Header'
import IframeFooter from 'components/base/IframeFooter'

const Wrapper = styled.div``
const Content = styled.div`
  max-width: 45em;
  margin: 0 auto 5em;
  padding-top: 2em;

  ${(props) => props.theme.mq.small} {
    margin: 0 3vw 5em;
  }
`
export default function Iframe(props) {
  return (
    <Wrapper>
      <Content>
        <Header iframe />
        {props.children}
      </Content>
      <IframeFooter about={'https://monconvertisseurco2.fr#informations'} />
    </Wrapper>
  )
}
