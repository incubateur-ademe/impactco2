import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FootprintModal from 'components/transport/modals/FootprintModal'

const Wrapper = styled.div`
  margin-bottom: 2.5rem;
`
const Result = styled.p`
  font-size: 1.25rem;
  line-height: 1;
  margin-bottom: 0.5rem;
  text-align: center;
`
const Start = styled.span`
  flex: 1;
  text-align: right;
`
const Number = styled.span`
  color: var(--primary-50);
  font-size: 5.5rem;
  font-weight: bold;
  margin: 0 0.75rem;
`
const Percent = styled.span`
  color: var(--primary-50);
  flex: 1;
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
`
const Details = styled.button`
  background: transparent;
  border: none;
  color: var(--primary-50);
  cursor: pointer;
  display: block;
  margin: 0 auto;
  padding: 0;
  text-decoration: underline;
`
export default function PercentFootprint(props) {
  const [openModal, setOpenModal] = useState(false)
  const [percent, setPercent] = useState(0)
  useEffect(() => {
    setPercent(Math.round((props.saved / (9.9 * 1000)) * 10000) / 100)
  }, [props.saved])
  return (
    <Wrapper>
      {openModal && <FootprintModal setOpen={setOpenModal} />}
      <Result>
        <Start>soit</Start> <Number>{percent}</Number> <Percent>%</Percent>
        <br />
        d&apos;économisé sur mon empreinte carbone annuelle
      </Result>
      <Details onClick={() => setOpenModal(true)}>Préciser ou calculer mon empreinte carbone</Details>
    </Wrapper>
  )
}
