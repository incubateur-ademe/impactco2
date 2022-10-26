import React from 'react'
import styled from 'styled-components'

import QualityInput from './videoInput/QualityInput'
import DurationInput from './videoInput/DurationInput'
import NetworkInput from './videoInput/NetworkInput'

const Wrapper = styled.div`
  width: calc(50% - 1rem);
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
`
export default function VideoInput(props) {
  return (
    <Wrapper>
      <QualityInput name={props.name} />
      <DurationInput name={props.name} />
      <NetworkInput name={props.name} />
    </Wrapper>
  )
}
