import React, { useContext } from 'react'
import styled from 'styled-components'

import TransportContext from 'components/transport/TransportProvider'

const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1.5rem;
  color: ${(props) => props.theme.colors.text};
  display: flex;
  left: calc(100% + 0.25rem);
  margin-left: 0.4rem;
  position: absolute;
  top: 50%;
  transform: translateY(calc(-100% + 0.25rem));
  transition: background-color 200ms ease-out;
`
const Carpoolers = styled.div`
  cursor: default;
  font-size: 0.75rem;
  padding: 0.4rem 0;
  white-space: nowrap;
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
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.main};
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.2rem 0.8rem 0.2rem 0.4rem;
`
const ButtonLess = styled(ButtonMore)`
  padding: 0.2rem 0.4rem 0.2rem 0.8rem;
`
export default function Carpool() {
  const { carpool, setCarpool } = useContext(TransportContext)

  return (
    <>
      <Wrapper
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          e.nativeEvent.preventDefault()
        }}
      >
        <ButtonLess
          onClick={() =>
            setCarpool((prevCarpool) => (prevCarpool > 2 ? prevCarpool - 1 : 0))
          }
        >
          -
        </ButtonLess>
        <Carpoolers>
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
    </>
  )
}
