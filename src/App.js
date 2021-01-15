import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'

import { GlobalStyle, mq } from 'utils/styles'
import StyleProvider from 'components/providers/StyleProvider'
import CO2NumberProvider from 'components/providers/CO2NumberProvider'
import EquivalentsProvider from 'components/providers/EquivalentsProvider'

import EmbedConfigurator from 'components/misc/EmbedConfigurator'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import ChoicePopin from 'components/misc/ChoicePopin'
import CO2EPopin from 'components/misc/CO2EPopin'
import Comparator from 'views/Comparator'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${mq.medium} {
    flex-direction: column-reverse;
  }
`
const Content = styled.div`
  flex: 1;
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
              <GlobalStyle />
              <Wrapper>
                <Content>
                  <Header />
                  <Comparator />
                  <Footer />
                </Content>
                <EmbedConfigurator />
              </Wrapper>
              <ChoicePopin />
              <CO2EPopin />
            </EquivalentsProvider>
          </CO2NumberProvider>
        </StyleProvider>
      </QueryParamProvider>
    </Router>
  )
}

export default App
