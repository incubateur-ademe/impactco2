/* eslint-disable no-import-assign */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { useState } from 'react'
import { ParamProvider } from 'components/providers/ParamProvider'
import { RulesProviderLivraison } from 'components/livraison/RulesProviderLivraison'

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
          <ParamProvider>{children} </ParamProvider>
        </RulesProviderLivraison>
      </QueryClientProvider>
    )
  }

  return render(component, { wrapper: Wrapper, ...options })
}
