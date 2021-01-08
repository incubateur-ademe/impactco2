import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { QueryParamProvider } from 'use-query-params'

import { GlobalStyle } from 'utils/styles'

import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
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
        <Wrapper>
          <GlobalStyle />
          <Header />
          <Comparator />
          <Footer />
        </Wrapper>
      </QueryParamProvider>
    </Router>
  )
}

export default App
