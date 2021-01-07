import React from 'react'
import styled from 'styled-components'

import { mq } from 'utils/styles'
import CO2NumberProvider from 'components/providers/CO2NumberProvider'

import CO2Input from './comparator/CO2Input.js'
import Equivalents from './comparator/Equivalents'

const Wrapper = styled.div`
  flex: 1;
  max-width: 45em;
  margin: 0 auto 6em;

  ${mq.small} {
    margin: 0 3vw 6em;
  }
`
export default function Comparator() {
  return (
    <CO2NumberProvider>
      <Wrapper>
        <CO2Input />
        <Equivalents />
      </Wrapper>
    </CO2NumberProvider>
  )
}
