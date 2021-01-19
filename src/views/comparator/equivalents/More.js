import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'utils/ModalContext'

import Tile from 'components/misc/Tile'

const Plus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 10em;
  font-weight: 700;
  line-height: 0.7;
  transition: all 400ms ease-in-out;

  div:hover > & {
    font-size: 13em;
    transform: rotate(360deg);
  }
`
export default function More(props) {
  const { setEquivalents } = useContext(ModalContext)

  return (
    <Tile active onClick={() => setEquivalents(true)}>
      <Plus>+</Plus>
    </Tile>
  )
}
