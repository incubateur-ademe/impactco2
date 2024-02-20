import React from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import Checkbox from './Checkbox'

const Equivalents = ({ equivalentsToDisplay }: { equivalentsToDisplay: ComputedEquivalent[] }) => {
  return equivalentsToDisplay.map((equivalent) => <Checkbox key={equivalent.slug} equivalent={equivalent} />)
}

export default Equivalents
