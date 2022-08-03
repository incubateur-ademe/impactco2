import React, { useContext } from 'react'
import styled from 'styled-components'

import TransportContext from 'components/transport/TransportProvider'
import Address from './itinerary/Address'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

export default function Itinerary() {
  const { start, setStart, end, setEnd } = useContext(TransportContext)

  return (
    <Wrapper>
      <Address
        placeholder='Départ'
        address={start?.address}
        setPlace={setStart}
      />
      <Address placeholder='Arrivée' address={end?.address} setPlace={setEnd} />
    </Wrapper>
  )
}
