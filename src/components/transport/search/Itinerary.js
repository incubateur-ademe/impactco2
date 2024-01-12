import React from 'react'
import styled from 'styled-components'
import useTransportContext from 'components/transport/TransportProvider'
import Address from './itinerary/Address'

const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`

export default function Itinerary() {
  const { start, setStart, end, setEnd } = useTransportContext()

  return (
    <Wrapper>
      <Address placeholder='Départ' address={start?.address} setPlace={setStart} />
      <Address placeholder='Arrivée' address={end?.address} setPlace={setEnd} />
    </Wrapper>
  )
}
