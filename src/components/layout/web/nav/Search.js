import React from 'react'
import styled from 'styled-components'

import SearchBar from './search/SearchBar'

const Wrapper = styled.div`
  position: relative;
  width: 20rem;
  font-size: 0.875rem;
`
export default function Search() {
  return (
    <Wrapper>
      <SearchBar />
    </Wrapper>
  )
}
