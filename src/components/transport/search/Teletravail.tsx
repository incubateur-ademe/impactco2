import React, { useState } from 'react'
import styled from 'styled-components'
import useParamContext from 'components/providers/ParamProvider'
import TeletravailModal from '../modals/TeletravailModal'
import Address from './itinerary/Address'
import Days from './teletravail/Days'
import Transportations from './teletravail/Transportations'

const Details = styled.button`
  background: transparent;
  border: none;
  color: var(--primary-50);
  cursor: pointer;
  display: block;
  font-size: 0.875rem;
  margin: 0 auto;
  padding: 0;
  text-decoration: underline;
`
export default function Teletravail() {
  const {
    teletravail: { start, setStart, end, setEnd, transport },
  } = useParamContext()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Address placeholder='Domicile' address={start?.address} setPlace={setStart} />
      <Address placeholder='Travail' address={end?.address} setPlace={setEnd} />
      <Transportations />
      <Days />
      {start && end && transport && (
        <Details onClick={() => setOpen(true)}>Voir et ajuster les détails du calcul</Details>
      )}
      {open && <TeletravailModal setOpen={setOpen} />}
    </>
  )
}
