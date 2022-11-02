import React from 'react'
import styled from 'styled-components'

import TypeInput from './deviceInput/TypeInput'
import LifespanInput from './deviceInput/LifespanInput'

const Wrapper = styled.div`
  width: calc(50% - 1rem);
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;

  ${(props) => props.theme.mq.medium} {
    width: 100%;
  }
`
export default function DeviceInput(props) {
  return (
    <Wrapper>
      <TypeInput name={props.name} />
      <LifespanInput
        name={props.name}
        construction={props.construction}
        setConstruction={props.setConstruction}
      />
    </Wrapper>
  )
}
