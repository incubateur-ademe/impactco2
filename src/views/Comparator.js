import React from 'react'
import styled from 'styled-components'

import CO2Input from './comparator/CO2Input.js'
import Equivalents from './comparator/Equivalents'

const Wrapper = styled.div`
  flex: 1;
`
export default function Comparator() {
  return (
    <Wrapper>
      <CO2Input />
      <Equivalents />
    </Wrapper>
  )
}
