import React from 'react'
import styled from 'styled-components'

import DurationInput from './videoInput/DurationInput'
import NetworkInput from './videoInput/NetworkInput'
import ParticipantInput from './videoInput/ParticipantsInput'
import QualityInput from './videoInput/QualityInput'

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1.5rem;

  ${(props) => props.theme.mq.medium} {
    width: 100%;
  }
`
export default function VideoInput(props) {
  return (
    <Wrapper>
      <QualityInput name={props.name} />
      <DurationInput name={props.name} />
      <ParticipantInput name={props.name} />
      <NetworkInput name={props.name} />
    </Wrapper>
  )
}
