import React, { useEffect } from 'react'
import styled from 'styled-components'
import useTransportContext from 'components/transport/TransportProvider'
import Selector from './days/Selector'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 -0.75rem;
`
export default function Days() {
  const { start, end, teletravailTransportation, presentiel, setPresentiel, teletravail, setTeletravail, days } =
    useTransportContext()

  useEffect(() => {
    if (presentiel + teletravail !== days) {
      if (presentiel > days) {
        setPresentiel(days)
        setTeletravail(0)
      } else {
        setTeletravail(days - presentiel)
      }
    }
  }, [days, presentiel, teletravail, setPresentiel, setTeletravail])

  return start && start.address && end && end.address && teletravailTransportation ? (
    <Wrapper>
      <Selector
        label='Présentiel'
        value={presentiel}
        onChange={(value) => {
          setPresentiel(value)
          setTeletravail(days - value)
        }}
      />
      <Selector
        label='Télétravail'
        value={teletravail}
        onChange={(value) => {
          setTeletravail(value)
          setPresentiel(days - value)
        }}
      />
    </Wrapper>
  ) : null
}
