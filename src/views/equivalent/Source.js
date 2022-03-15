import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div``
const Title = styled.h3`
  text-align: center;
  color: ${(props) => props.theme.colors.text};
`
const Text = styled.p``
export default function Details(props) {
  return (
    <Wrapper id='sources'>
      <Title>Sources et hypothèses</Title>
      <Text>{props.equivalent.sources}</Text>
    </Wrapper>
  )
}
