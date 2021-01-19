import React from 'react'
import styled from 'styled-components'

import CO2Input from './comparator/CO2Input.js'
import Equivalents from './comparator/Equivalents'

const Wrapper = styled.div`
  flex: 1;
  max-width: 45em;
  margin: 0 auto 6em;

  ${(props) => props.theme.mq.small} {
    margin: 0 3vw 6em;
  }
`
export default function Comparator() {
  return (
    <Wrapper>
      <CO2Input />
      <Equivalents />
    </Wrapper>
  )
}
