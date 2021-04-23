import React from 'react'
import styled from 'styled-components'

import useWindowSize from 'hooks/useWindowSize'

import ThemeToggle from 'components/base/ThemeToggle'
import InstallButton from 'components/base/InstallButton'
import Header from 'components/misc/Header'
import Learning from 'components/misc/Learning'
import ShareWrapper from 'components/wrappers/ShareWrapper'
import EmbedWrapper from 'components/wrappers/EmbedWrapper'
import ContactWrapper from 'components/wrappers/ContactWrapper'
import FooterWrapper from 'components/wrappers/FooterWrapper'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${(props) => props.theme.mq.medium} {
    flex-direction: column-reverse;
  }
`
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`
const FullScreen = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 46rem;
  min-height: ${(props) => props.windowHeight}px;
  margin: 0 auto 5rem;
  padding: 0 0.5rem;

  ${(props) => props.theme.mq.small} {
    width: auto;
  }
`
export default function Web(props) {
  const { height } = useWindowSize()

  return (
    <Wrapper>
      <ThemeToggle />
      <Content>
        <FullScreen windowHeight={height}>
          <Header />
          {props.children}
        </FullScreen>
        <Learning />
        <FooterWrapper />
      </Content>
      <EmbedWrapper />
      <ShareWrapper />
      <ContactWrapper />
      <InstallButton />
    </Wrapper>
  )
}
