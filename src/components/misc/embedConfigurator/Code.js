import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

const Wrapper = styled.div`
  margin-bottom: 2em;
`
const Text = styled.code`
  display: block;
  margin-bottom: 0.5em;
  padding: 1em 0; 
  color: ${(props) => props.theme.colors.main};
  word-break: break-word;
  border-bottom: 1px solid ${(props) => props.theme.colors.main};
  cursor: pointer;
`
const Explication = styled.p`
  margin-bottom: 0;
  font-size: 0.875em;
  font-style: italic;
`;
export default function Code() {
  let location = useLocation()
  return (
    <Wrapper><Text
      onClick={() => window.alert('not functional yet')}
    >{`<script src="https://dummywebsite.com/${location.search}"></script>`}</Text><Explication>Copiez ce code puis ajoutez-le où vous souhaitez qu'il s'affiche sur votre site web</Explication></Wrapper>
  )
}
