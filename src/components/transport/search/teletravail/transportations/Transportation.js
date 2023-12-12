import React, { useContext } from 'react'
import styled from 'styled-components'
import { track } from 'utils/matomo'
import Emoji from 'components/base/Emoji'
import TransportContext from 'components/transport/TransportProvider'

const Wrapper = styled.button`
  background-color: ${(props) => (props.active ? props.theme.colors.main : 'transparent')};
  border: 0.125rem solid ${(props) => props.theme.colors.main};
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  height: 2.5rem;
  margin: 0.375rem;
  padding: 0;
  position: relative;
  width: 2.5rem;
`
const Second = styled.span`
  bottom: 0;
  font-size: 0.75em;
  position: absolute;
  right: 0;
  transform: translate(30%, 50%);
`
export default function Transportation(props) {
  const { teletravailTransportation, setTeletravailTransportation } = useContext(TransportContext)

  return (
    <Wrapper
      onClick={() => {
        track('Transport télétravail', 'Mode de transport', props.transportation.slug)
        setTeletravailTransportation(props.transportation.id)
      }}
      data-testid={`transport-${props.transportation.id}`}
      active={teletravailTransportation === props.transportation.id}>
      <Emoji>{props.transportation.emoji}</Emoji>
      {props.transportation.secondEmoji && (
        <Second>
          <Emoji>{props.transportation.secondEmoji}</Emoji>
        </Second>
      )}
    </Wrapper>
  )
}
