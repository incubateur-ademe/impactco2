import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'

import { GlobalStyle } from 'utils/styles'
import StyleProvider from 'components/providers/StyleProvider'
import ModalProvider from 'components/providers/ModalProvider'
import UXProvider from 'components/providers/UXProvider'
import CO2NumberProvider from 'components/providers/CO2NumberProvider'
import EquivalentsProvider from 'components/providers/EquivalentsProvider'

import Layout from 'components/layout/Layout'
import EquivalentsModal from 'components/modals/EquivalentsModal'
import CO2EModal from 'components/modals/CO2EModal'
import AboutModal from 'components/modals/AboutModal'

function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <StyleProvider>
          <UXProvider>
            <ModalProvider>
              <CO2NumberProvider>
                <EquivalentsProvider>
                  <GlobalStyle />
                  <Layout />
                  <EquivalentsModal />
                  <CO2EModal />
                  <AboutModal />
                </EquivalentsProvider>
              </CO2NumberProvider>
            </ModalProvider>
          </UXProvider>
        </StyleProvider>
      </QueryParamProvider>
    </Router>
  )
}

export default App
