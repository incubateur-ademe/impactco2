import React from 'react'
import styled from 'styled-components'

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
    <Wrapper>
      <GlobalStyle />
      <Header />
      <Comparator />
      <Footer />
    </Wrapper>
  )
}

export default App
