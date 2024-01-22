import React, { useEffect } from 'react'
import styled from 'styled-components'
import useParamContext from 'components/providers/ParamProvider'
import Selector from './days/Selector'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 -0.75rem;
`
export default function Days() {
  const {
    teletravail: { start, end, transport, presentiel, setPresentiel, teletravail, setTeletravail, days },
  } = useParamContext()

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

  return start && start.address && end && end.address && transport ? (
    <Wrapper>
      <Selector
        label='Présentiel'
        value={presentiel}
        onChange={(value: number) => {
          setPresentiel(value)
          setTeletravail(days - value)
        }}
      />
      <Selector
        label='Télétravail'
        value={teletravail}
        onChange={(value: number) => {
          setTeletravail(value)
          setPresentiel(days - value)
        }}
      />
    </Wrapper>
  ) : null
}
