import React from 'react'
import styled from 'styled-components'

import Header from 'components/layout/Header'
import IframeFooter from 'components/base/IframeFooter'

const Wrapper = styled.div``
const Content = styled.div`
  max-width: 45em;
  margin: 2em auto 5em;

  ${(props) => props.theme.mq.small} {
    margin: 2em 3vw 5em;
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
