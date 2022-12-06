import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.p`
  margin: 0 auto 1rem;
  font-size: 1rem;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    margin-bottom: 1rem;
  }
`
export default function Description(props) {
  return props.description && <Wrapper>{props.description}</Wrapper>
}
