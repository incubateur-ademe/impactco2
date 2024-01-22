import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import DurationInput from './videoInput/DurationInput'
import NetworkInput from './videoInput/NetworkInput'
import ParticipantInput from './videoInput/ParticipantsInput'
import QualityInput from './videoInput/QualityInput'

const Wrapper = styled.div`
  background-color: var(--secondary-10);
  border: 0.0625rem solid var(--secondary-10);
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1.5rem;

  ${MEDIA.LT.MEDIUM} {
    width: 100%;
  }
`
export default function VideoInput(props) {
  return (
    <Wrapper>
      <QualityInput name={props.name} engine={props.engine} setSituation={props.setSituation} />
      <DurationInput name={props.name} engine={props.engine} setSituation={props.setSituation} />
      <ParticipantInput name={props.name} engine={props.engine} setSituation={props.setSituation} />
      <NetworkInput name={props.name} engine={props.engine} setSituation={props.setSituation} />
    </Wrapper>
  )
}
