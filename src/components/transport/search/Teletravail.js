import React, { useContext } from 'react'
import styled from 'styled-components'

import TransportContext from 'components/transport/TransportProvider'
import ModalContext from 'components/providers/ModalProvider'
import Address from './itinerary/Address'
import Transportations from './teletravail/Transportations'
import Days from './teletravail/Days'

const Wrapper = styled.div``
const Details = styled.button`
  display: block;
  margin: 0 auto;
  padding: 0;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.main};
  text-decoration: underline;
  background: transparent;
  border: none;
  cursor: pointer;
`
export default function Teletravail() {
  const { start, setStart, end, setEnd, teletravailTransportation } =
    useContext(TransportContext)

  const { setTeletravail } = useContext(ModalContext)

  return (
    <Wrapper>
      <Address
        placeholder='Domicile'
        address={start?.address}
        setPlace={setStart}
      />
      <Address placeholder='Travail' address={end?.address} setPlace={setEnd} />
      <Transportations />
      <Days />
      {start && end && teletravailTransportation && (
        <Details onClick={() => setTeletravail(true)}>
          Voir et ajuster les détails du calcul
        </Details>
      )}
    </Wrapper>
  )
}
