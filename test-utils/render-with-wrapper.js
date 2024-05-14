/* eslint-disable no-import-assign */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { useState } from 'react'
import { RulesProviderLivraison } from 'src/providers/LivraisonProvider'
import { ParamProvider } from 'src/providers/ParamProvider'
import TranslationProvider from 'src/providers/TranslationProvider'

jest.mock('next/router', () => jest.requireActual('next-router-mock'))
jest.mock('@incubateur-ademe/publicodes-negaoctet', () => ({}))

export function renderWithWrapper(component, options) {
  nextRouter.useRouter = jest.fn()
  nextRouter.useRouter.mockImplementation(() => ({ route: '/', asPath: '/', query: {} }))

  console.error = () => {}
  const Wrapper = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient())

    return (
      <QueryClientProvider client={queryClient}>
        <RulesProviderLivraison>
          <ParamProvider>
            <TranslationProvider>{children}</TranslationProvider>
          </ParamProvider>
        </RulesProviderLivraison>
      </QueryClientProvider>
    )
  }

  return render(component, { wrapper: Wrapper, ...options })
}
