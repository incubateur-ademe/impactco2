import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.p`
  font-size: 1rem;
  margin: 0 auto 1rem;
  max-width: ${(props) => (props.$large ? 'none' : '33rem')};
  text-align: center;

  ${(props) => props.theme.mq.small} {
    margin-bottom: 1rem;
  }
`
export default function Description(props) {
  return props.description && <Wrapper $large={props.large}>{props.description}</Wrapper>
}
