import React from 'react'
import styled from 'styled-components'
import { TransportSimulateur } from 'types/transport'
import { MEDIA } from 'utils/styles'
import useParamContext from 'components/providers/ParamProvider'

const Wrapper = styled.div`
  align-items: center;
  background-color: var(--secondary-10);
  border-radius: 1.5rem;
  color: var(--neutral-70);
  display: flex;
`
const Carpoolers = styled.div`
  cursor: default;
  font-size: 0.75rem;
  padding: 0.4rem 0;
  white-space: nowrap;
`
const Start = styled.span`
  ${MEDIA.LT.MEDIUM} {
    display: none;
  }
`
const Number = styled.span`
  display: inline-block;
  min-width: 0.6em;
  text-align: center;
`
const Plural = styled.span<{ $visible: boolean }>`
  opacity: ${(props) => (props.$visible ? 1 : 0)};
`
const ButtonMore = styled.button`
  background: transparent;
  border: none;
  color: var(--primary-50);
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.2rem 0.8rem 0.2rem 0.4rem;
`
const ButtonLess = styled(ButtonMore)`
  padding: 0.2rem 0.4rem 0.2rem 0.8rem;
`

export default function Carpool({ type }: { type: TransportSimulateur }) {
  const params = useParamContext()

  const { carpool, setCarpool } = params[type]
  return (
    <>
      <Wrapper
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          e.nativeEvent.preventDefault()
        }}>
        <ButtonLess onClick={() => setCarpool((prevCarpool) => (prevCarpool > 2 ? prevCarpool - 1 : 0))}>-</ButtonLess>
        <Carpoolers>
          <Start>avec </Start>
          <Number>{carpool - 1}</Number> covoitureur
          <Plural $visible={carpool > 2}>s</Plural>
        </Carpoolers>
        <ButtonMore onClick={() => setCarpool((prevCarpool) => (prevCarpool < 5 ? prevCarpool + 1 : prevCarpool))}>
          +
        </ButtonMore>
      </Wrapper>
    </>
  )
}
