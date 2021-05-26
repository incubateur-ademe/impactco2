import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { QueryClient, QueryClientProvider } from 'react-query'

import { GlobalStyle } from 'utils/styles'
import StyleProvider from 'components/providers/StyleProvider'
import ModalProvider from 'components/providers/ModalProvider'
import UXProvider from 'components/providers/UXProvider'
import CO2NumberProvider from 'components/providers/CO2NumberProvider'
import EquivalentsProvider from 'components/providers/EquivalentsProvider'

import Web from 'components/layout/Web'
import Iframe from 'components/layout/Iframe'
import EquivalentsModal from 'components/modals/EquivalentsModal'
import CO2EModal from 'components/modals/CO2EModal'
import AboutModal from 'components/modals/AboutModal'
import InstallInstructionsModal from 'components/modals/InstallInstructionsModal'
import Comparator from 'views/Comparator'

const queryClient = new QueryClient()

function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <QueryClientProvider client={queryClient}>
          <UXProvider>
            <StyleProvider>
              <ModalProvider>
                <CO2NumberProvider>
                  <EquivalentsProvider>
                    <GlobalStyle />
                    <Switch>
                      <Route path='/embed'>
                        <Iframe>
                          <Comparator iframe />
                        </Iframe>
                      </Route>
                      <Route>
                        <Web>
                          <Comparator />
                        </Web>
                      </Route>
                    </Switch>
                    <EquivalentsModal />
                    <CO2EModal />
                    <AboutModal />
                    <InstallInstructionsModal />
                  </EquivalentsProvider>
                </CO2NumberProvider>
              </ModalProvider>
            </StyleProvider>
          </UXProvider>
        </QueryClientProvider>
      </QueryParamProvider>
    </Router>
  )
}

export default App
