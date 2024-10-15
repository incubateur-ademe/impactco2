import React, { RefObject } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import Checkbox from './Checkbox'

const Equivalents = ({
  equivalentsToDisplay,
  setEquivalents,
  equivalents,
  firstRef,
}: {
  equivalentsToDisplay: ComputedEquivalent[]
  equivalents: string[]
  setEquivalents: (value: string[]) => void
  firstRef?: RefObject<HTMLInputElement>
}) => {
  return equivalentsToDisplay.map((equivalent, index) => (
    <li key={equivalent.slug}>
      <Checkbox
        equivalents={equivalents}
        equivalent={equivalent}
        setEquivalents={setEquivalents}
        ref={index === 0 ? firstRef : undefined}
      />
    </li>
  ))
}

export default Equivalents
