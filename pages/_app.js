import React from 'react'
import { NextAdapter } from 'next-query-params'
import { QueryParamProvider } from 'use-query-params'

import { GlobalStyle } from 'utils/styles'
import fonts from 'utils/fonts.css'

import { StyleProvider } from 'components/providers/StyleProvider'
import { ModalProvider } from 'components/providers/ModalProvider'
import { DataProvider } from 'components/providers/DataProvider'

function MyApp({ Component, pageProps }) {
  return (
    <QueryParamProvider adapter={NextAdapter}>
      <StyleProvider>
        <DataProvider>
          <ModalProvider>
            <GlobalStyle />
            <Component {...pageProps} />
          </ModalProvider>
        </DataProvider>
      </StyleProvider>
    </QueryParamProvider>
  )
}

export default MyApp
