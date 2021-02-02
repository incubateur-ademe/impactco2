import React, { useContext } from 'react'
import styled from 'styled-components'
import { SortableElement, sortableHandle } from 'react-sortable-hoc'

import Tile from 'components/misc/Tile'
import CO2NumberContext from 'utils/CO2NumberContext'
import ModalContext from 'utils/ModalContext'

import NumberInput from './equivalent/NumberInput'

const Emoji = styled.div`
  font-size: 4em;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    pointer-events: none;
  }

  span {
    cursor: move;
  }
`
const Name = styled.div``
const About = styled.div`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  font-weight: 700;
  cursor: pointer;
`
const DragHandle = sortableHandle((props) => <span>{props.emoji}</span>)
const Equivalent = SortableElement((props) => {
  const { CO2 } = useContext(CO2NumberContext)
  const { setAbout } = useContext(ModalContext)

  const total = Math.round((CO2 / props.equivalent.total) * 10) / 10

  return (
    <Tile>
      {props.equivalent.about && (
        <About onClick={() => setAbout(props.equivalent.about)}>?</About>
      )}
      <Emoji>
        <DragHandle emoji={props.equivalent.emoji} />
      </Emoji>
      <NumberInput value={total} total={props.equivalent.total} />
      <Name>
        {props.equivalent.name.fr.replaceAll('[s]', total > 1 ? 's' : '')}
      </Name>
    </Tile>
  )
})

export default Equivalent
