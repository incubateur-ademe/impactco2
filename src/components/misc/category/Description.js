import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.p`
  max-width: 25rem;
`
export default function Description(props) {
  return props.description && <Wrapper>{props.description}</Wrapper>
}
