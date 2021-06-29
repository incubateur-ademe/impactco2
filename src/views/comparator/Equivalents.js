import React, { useContext } from 'react'
import styled from 'styled-components'
import { SortableContainer } from 'react-sortable-hoc'

import EquivalentsContext from 'utils/EquivalentsContext'
import Equivalent from './equivalents/Equivalent'
import More from './equivalents/More'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
`
const SortableList = SortableContainer(({ equivalents }) => {
  return (
    <Wrapper>
      {equivalents.map((equivalent, index) => (
        <Equivalent key={equivalent.id} index={index} equivalent={equivalent} />
      ))}
      <More />
    </Wrapper>
  )
})
export default function Equivalents() {
  const { equivalents, setEquivalents } = useContext(EquivalentsContext)
  console.log(equivalents)
  return (
    <SortableList
      equivalents={equivalents.filter((equivalent) => equivalent.active)}
      distance={1}
      axis={'xy'}
      onSortEnd={({ oldIndex, newIndex }) => {
        console.log(oldIndex, newIndex)
        const activeElements = equivalents.filter((equivalent) => equivalent.active)
        const equivalentToMove = activeElements[oldIndex]
        const equivalentsCopy = JSON.parse(JSON.stringify(activeElements))
        equivalentsCopy.splice(oldIndex, 1)
        equivalentsCopy.splice(newIndex, 0, equivalentToMove)
        setEquivalents([...equivalentsCopy, ...equivalents.filter((equivalent) => !equivalent.active)] )
      }}
      useDragHandle
    />
  )
}
