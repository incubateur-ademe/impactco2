import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

const Wrapper = styled.code`
  display: block;
  padding: 1em;
  color: ${(props) => props.theme.colors.main};
  word-break: break-word;
  border-bottom: 1px solid ${(props) => props.theme.colors.main};
  cursor: pointer;
`
export default function Code() {
  let location = useLocation()
  return (
    <Wrapper
      onClick={() => window.alert('not functional yet')}
    >{`https://dummywebsite.com/${location.search}`}</Wrapper>
  )
}
