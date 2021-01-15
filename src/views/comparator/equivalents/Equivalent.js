import React, { useContext } from 'react'
import styled from 'styled-components'

import Tile from 'components/misc/Tile'
import CO2NumberContext from 'utils/CO2NumberContext'

import NumberInput from './equivalent/NumberInput'

const Emoji = styled.div`
  font-size: 4em;
`

const Name = styled.div``
export default function Equivalent(props) {
  const { CO2 } = useContext(CO2NumberContext)

  const total = Math.round((CO2 / props.equivalent.total) * 10) / 10

  return (
    <Tile>
      <Emoji>{props.equivalent.emoji}</Emoji>
      <NumberInput value={total} total={props.equivalent.total} />
      <Name>
        {props.equivalent.name.fr.replaceAll('[s]', total > 1 ? 's' : '')}
      </Name>
    </Tile>
  )
}
