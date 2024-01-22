/* eslint-disable no-import-assign */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { useState } from 'react'
import { DataProvider } from 'components/providers/DataProvider'
import { ModalProvider } from 'components/providers/ModalProvider'
import { ParamProvider } from 'components/providers/ParamProvider'
import { RulesProviderLivraison } from 'components/livraison/RulesProviderLivraison'

export function renderWithWrapper(component, options) {
  nextRouter.useRouter = jest.fn()
  nextRouter.useRouter.mockImplementation(() => ({ route: '/', asPath: '/', query: {} }))
  const Wrapper = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient())

    return (
      <QueryClientProvider client={queryClient}>
        <RulesProviderLivraison>
          <DataProvider>
            <ModalProvider>
              <ParamProvider>{children}</ParamProvider>
            </ModalProvider>
          </DataProvider>
        </RulesProviderLivraison>
      </QueryClientProvider>
    )
  }

  return render(component, { wrapper: Wrapper, ...options })
}
