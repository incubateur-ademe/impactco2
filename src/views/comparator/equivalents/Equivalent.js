import React, { useContext } from 'react'
import styled from 'styled-components'

import Tile from 'components/misc/Tile'
import CO2NumberContext from 'utils/CO2NumberContext'

const Emoji = styled.div`
  font-size: 4em;
`
const Number = styled.div`
  font-size: ${(props) => (props.length > 8 ? '1.5em' : '2.5em')};
  font-weight: 700;
  line-height: ${(props) => (props.length > 8 ? '1.8' : 'inherit')};
`
const Name = styled.div``
export default function Equivalent(props) {
  const { CO2 } = useContext(CO2NumberContext)

  const total = Math.round((CO2 / props.equivalent.total) * 10) / 10

  return (
    <Tile>
      <Emoji>{props.equivalent.emoji}</Emoji>
      <Number length={String(total).length}>{total}</Number>
      <Name>{props.equivalent.name.fr}</Name>
    </Tile>
  )
}
