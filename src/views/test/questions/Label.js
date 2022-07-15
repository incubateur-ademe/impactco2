import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.p`
  display: block;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;

  ${(props) => props.theme.mq.small} {
    font-size: 1.125rem;
  }
`

export default function Label(props) {
  return <Wrapper>{props.rule.rawNode.question}</Wrapper>
}
