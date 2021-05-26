import React, { useContext } from 'react'
import styled from 'styled-components'
import { SortableContainer } from 'react-sortable-hoc'

import EquivalentsContext from 'utils/EquivalentsContext'

import EquivalentItem from './equivalentSelector/EquivalentItem'

const EquivalentList = styled.ul`
  flex: 1;
  margin: 0 0 1em;
  padding: 0;
  overflow-y: auto;
`
const SortableList = SortableContainer(({ equivalents, toggleActive }) => {
  return (
    <EquivalentList>
      {equivalents.map((equivalent, index) => (
        <EquivalentItem
          key={equivalent.id}
          index={index}
          equivalent={equivalent}
          onClick={() => toggleActive(equivalent.id)}
        />
      ))}
    </EquivalentList>
  )
})

export default function EquivalentSelector() {
  const { equivalents, setEquivalents } = useContext(EquivalentsContext)

  return (
    <SortableList
      equivalents={equivalents}
      toggleActive={(id) => {
        setEquivalents(
          equivalents.map((equivalent) => {
            if (equivalent.id === id) {
              equivalent.active = !equivalent.active
            }
            return equivalent
          })
        )
      }}
      onSortEnd={({ oldIndex, newIndex }) => {
        const equivalentToMove = equivalents[oldIndex]
        const equivalentsCopy = JSON.parse(JSON.stringify(equivalents))
        equivalentsCopy.splice(oldIndex, 1)
        equivalentsCopy.splice(newIndex, 0, equivalentToMove)
        setEquivalents(equivalentsCopy)
      }}
      useDragHandle
    />
  )
}
