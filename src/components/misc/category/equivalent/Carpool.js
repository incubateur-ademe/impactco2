import React, { useContext } from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import TransportationContext from 'utils/TransportationContext'

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
  margin-left: 0.4rem;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 1.5rem;
  transition: background-color 200ms ease-out;
`
const Carpoolers = styled.div`
  padding: 0.4rem 0;
  font-size: 0.75rem;
  white-space: nowrap;
  cursor: default;
`
const Start = styled.span`
  ${(props) => props.theme.mq.medium} {
    display: none;
  }
`
const Number = styled.span`
  display: inline-block;
  min-width: 0.6em;
  text-align: center;
`
const Plural = styled.span`
  opacity: ${(props) => (props.visible ? 1 : 0)};
`
const ButtonMore = styled.button`
  padding: 0.2rem 0.8rem 0.2rem 0.4rem;
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.background};
  background: transparent;
  border: none;
  cursor: pointer;
`
const ButtonLess = styled(ButtonMore)`
  padding: 0.2rem 0.4rem 0.2rem 0.8rem;
`
export default function Carpool(props) {
  const { carpool, setCarpool } = useContext(TransportationContext)

  return props.transportation.carpool ? (
    <>
      <Wrapper>
        <ButtonLess
          onClick={() =>
            setCarpool((prevCarpool) => (prevCarpool > 2 ? prevCarpool - 1 : 0))
          }
        >
          -
        </ButtonLess>
        <Carpoolers
          data-tip={
            'Seulement si ces covoitureurs évitent de faire le même trajet avec un véhicule équivalent'
          }
          data-for='carpool'
        >
          <Start>avec </Start>
          <Number>{carpool - 1}</Number> covoitureur
          <Plural visible={carpool > 2}>s</Plural>
        </Carpoolers>
        <ButtonMore
          onClick={() =>
            setCarpool((prevCarpool) =>
              prevCarpool < 5 ? prevCarpool + 1 : prevCarpool
            )
          }
        >
          +
        </ButtonMore>
      </Wrapper>
      <ReactTooltip id='carpool' />
    </>
  ) : null
}
