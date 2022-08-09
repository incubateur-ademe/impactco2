import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'components/providers/ModalProvider'
import TransportContext from 'components/transport/TransportProvider'

const Wrapper = styled.div`
  margin-bottom: 2.5rem;
`
const Result = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  text-align: center;
  line-height: 1;
`
const Start = styled.span`
  flex: 1;
  text-align: right;
`
const Number = styled.span`
  margin: 0 0.75rem;
  font-size: 5.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.main};
`
const Percent = styled.span`
  flex: 1;
  text-align: left;
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.main};
`
const Details = styled.button`
  display: block;
  margin: 0 auto;
  padding: 0;
  color: ${(props) => props.theme.colors.main};
  text-decoration: underline;
  background: transparent;
  border: none;
  cursor: pointer;
`
export default function PercentFootprint(props) {
  const { setFootprint } = useContext(ModalContext)
  const { yearlyFootprint } = useContext(TransportContext)

  const [percent, setPercent] = useState(0)
  useEffect(() => {
    setPercent(
      Math.round((props.saved / (yearlyFootprint * 1000)) * 10000) / 100
    )
  }, [yearlyFootprint, props.saved])
  return (
    <Wrapper>
      <Result>
        <Start>soit</Start> <Number>{percent}</Number> <Percent>%</Percent>
        <br />
        d&apos;économisé sur mon empreinte carbone annuelle
      </Result>
      <Details onClick={() => setFootprint(true)}>
        Préciser ou calculer mon empreinte carbone
      </Details>
    </Wrapper>
  )
}
