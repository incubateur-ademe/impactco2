import React from 'react'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'

import { GlobalStyle } from 'utils/styles'
import ModalProvider from 'components/providers/ModalProvider'
import UXProvider from 'components/providers/UXProvider'
import DataProvider from 'components/providers/DataProvider'
import ModalWrapper from 'components/wrappers/ModalWrapper'
import IframeFooter from './iframe/IframeFooter'

const queryClient = new QueryClient()

const Wrapper = styled.div`
  padding: 1rem 0;
`
export default function Iframe(props) {
  return (
    <>
      <Wrapper>
        <QueryClientProvider client={queryClient}>
          <UXProvider>
            <DataProvider>
              <ModalProvider>
                <GlobalStyle />
                {props.children}
                <IframeFooter />
                <ModalWrapper />
              </ModalProvider>
            </DataProvider>
          </UXProvider>
        </QueryClientProvider>
      </Wrapper>
    </>
  )
}
