import React from 'react'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'

import { GlobalStyle } from 'utils/styles'
import useIframe from 'hooks/useIframe'
import ModalProvider from 'components/providers/ModalProvider'
import UXProvider from 'components/providers/UXProvider'
import DataProvider from 'components/providers/DataProvider'
import HeaderWrapper from 'components/wrappers/HeaderWrapper'
import Nav from './web/Nav'
import BreadCrumb from './web/BreadCrumb'
import FooterWrapper from 'components/wrappers/FooterWrapper'
import Seo from './web/Seo'
import ModalWrapper from 'components/wrappers/ModalWrapper'

const queryClient = new QueryClient()

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${(props) => props.theme.mq.small} {
    display: none;
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
  min-height: ${(props) => (props.iframe ? 'none' : '100vh')};
  padding: ${(props) => (props.iframe ? 0.75 : 0)}rem 0
    ${(props) => (props.iframe ? 0 : 5)}rem;
`
const Responsive = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    display: flex;
  }
`
export default function Web(props) {
  const iframe = useIframe()

  return (
    <>
      {' '}
      <Wrapper>
        <Seo title={props.title} />
        <QueryClientProvider client={queryClient}>
          <UXProvider>
            <DataProvider>
              <ModalProvider>
                <GlobalStyle />
                <Content>
                  <FullScreen iframe={iframe}>
                    {!iframe && <HeaderWrapper />}
                    <Nav />
                    <BreadCrumb breadcrumb={props.breadcrumb} />
                    {props.children}
                  </FullScreen>
                  <FooterWrapper iframe={iframe} />
                </Content>
                <ModalWrapper />
              </ModalProvider>
            </DataProvider>
          </UXProvider>
        </QueryClientProvider>
      </Wrapper>
      <Responsive>Ce site n'est pas encore accessible mobile</Responsive>
    </>
  )
}
