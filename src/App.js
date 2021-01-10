import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'

import { GlobalStyle } from 'utils/styles'
import StyleProvider from 'components/providers/StyleProvider'
import CO2NumberProvider from 'components/providers/CO2NumberProvider'
import EquivalentsProvider from 'components/providers/EquivalentsProvider'

import EmbedConfigurator from 'components/misc/EmbedConfigurator'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import ChoicePopin from 'components/misc/ChoicePopin'
import Comparator from 'views/Comparator'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <StyleProvider>
          <CO2NumberProvider>
            <EquivalentsProvider>
              <Wrapper>
                <GlobalStyle />
                <EmbedConfigurator />
                <Header />
                <Comparator />
                <Footer />
              </Wrapper>
              <ChoicePopin />
            </EquivalentsProvider>
          </CO2NumberProvider>
        </StyleProvider>
      </QueryParamProvider>
    </Router>
  )
}

export default App
