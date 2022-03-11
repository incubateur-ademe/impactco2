import React, { useContext } from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import ModalContext from 'utils/ModalContext'

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
  margin-left: 0.25rem;
`
const Plus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
  font-weight: bold;
  line-height: 0.7;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 1rem;
  border: none;
`
export default function Uncertainty(props) {
  const { setRadiativeForcing } = useContext(ModalContext)

  return props.transportation.uncertainty ? (
    <Wrapper onClick={() => setRadiativeForcing(true)}>
      <Plus data-tip={'Impact des trainées'} data-for='uncertainty'>
        ?
      </Plus>
      <ReactTooltip id='uncertainty' />
    </Wrapper>
  ) : null
}
