import React, { useContext } from 'react'
import styled from 'styled-components'
import { SortableElement, sortableHandle } from 'react-sortable-hoc'

import Tile from 'components/misc/Tile'
import CO2NumberContext from 'utils/CO2NumberContext'

import NumberInput from './equivalent/NumberInput'

const Emoji = styled.div`
  font-size: 4em;
  text-align: center;
  span {
    cursor: move;
  }
`
const Name = styled.div``

const DragHandle = sortableHandle((props) => (
  <Emoji>
    <span>{props.emoji}</span>
  </Emoji>
))
const Equivalent = SortableElement((props) => {
  const { CO2 } = useContext(CO2NumberContext)

  const total = Math.round((CO2 / props.equivalent.total) * 10) / 10

  return (
    <Tile>
      <DragHandle emoji={props.equivalent.emoji} />
      <NumberInput value={total} total={props.equivalent.total} />
      <Name>
        {props.equivalent.name.fr.replaceAll('[s]', total > 1 ? 's' : '')}
      </Name>
    </Tile>
  )
})

export default Equivalent
