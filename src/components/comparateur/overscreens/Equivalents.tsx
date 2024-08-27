import React from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import Checkbox from './Checkbox'

const Equivalents = ({
  equivalentsToDisplay,
  setEquivalents,
  equivalents,
}: {
  equivalentsToDisplay: ComputedEquivalent[]
  equivalents: string[]
  setEquivalents: (value: string[]) => void
}) => {
  return equivalentsToDisplay.map((equivalent) => (
    <li key={equivalent.slug}>
      <Checkbox equivalents={equivalents} equivalent={equivalent} setEquivalents={setEquivalents} />
    </li>
  ))
}

export default Equivalents
