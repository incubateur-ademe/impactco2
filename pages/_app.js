import { init } from '@socialgouv/matomo-next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextAdapter } from 'next-query-params'
import React, { useEffect, useState } from 'react'
import { QueryParamProvider } from 'use-query-params'
import 'utils/fonts.css'
import { GlobalStyle } from 'utils/styles'
import 'utils/variables.css'
import { DataProvider } from 'components/providers/DataProvider'
import { ModalProvider } from 'components/providers/ModalProvider'
import { ParamProvider } from 'components/providers/ParamProvider'
import useTheme from 'components/layout/Theme'

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())

  useTheme()
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_MATOMO === 'true') {
      init({ url: 'https://stats.data.gouv.fr', siteId: 156 })

      if (typeof window !== 'undefined' && typeof window.please === 'undefined') {
        window.please = {}
        window.please.track = function (ary) {
          window?._paq?.push(ary)
        }
      }
    }
  }, [])

  return (
    <QueryParamProvider adapter={NextAdapter}>
      <QueryClientProvider client={queryClient}>
        <DataProvider>
          <ParamProvider>
            <ModalProvider>
              <GlobalStyle />
              <Component {...pageProps} />
            </ModalProvider>
          </ParamProvider>
        </DataProvider>
      </QueryClientProvider>
    </QueryParamProvider>
  )
}

export default MyApp
