import React from 'react'
import styled from 'styled-components'
import useParamContext from 'components/providers/ParamProvider'
import Address from './itinerary/Address'

const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`

export default function Itinerary() {
  const {
    itineraire: { start, setStart, end, setEnd },
  } = useParamContext()

  return (
    <Wrapper>
      <Address placeholder='Départ' address={start?.address} setPlace={setStart} />
      <Address placeholder='Arrivée' address={end?.address} setPlace={setEnd} />
    </Wrapper>
  )
}
