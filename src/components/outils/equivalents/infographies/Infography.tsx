import React, { useMemo } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { overScreenEquivalentInfographyValues } from 'components/misc/category/overScreens/Values'
import Shareable from 'components/misc/shareable/Shareable'
import InfographySimulator from './InfographySimulator'

const Infography = ({ equivalent, equivalents }: { equivalent: ComputedEquivalent; equivalents: string[] }) => {
  const overScreens = useMemo(() => overScreenEquivalentInfographyValues(equivalent), [equivalent])

  return (
    <Shareable tracking={`${equivalent.name} infographie`} overScreens={overScreens} secondary=''>
      <InfographySimulator equivalents={equivalents} />
    </Shareable>
  )
}

export default Infography
