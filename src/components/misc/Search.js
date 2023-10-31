import React from 'react'
import styled from 'styled-components'
import SearchBar from './search/SearchBar'

const Wrapper = styled.div`
  position: relative;
`
export default function Search(props) {
  return (
    <Wrapper className={props.className}>
      <SearchBar placeholder={props.placeholder} home={props.home} />
    </Wrapper>
  )
}
