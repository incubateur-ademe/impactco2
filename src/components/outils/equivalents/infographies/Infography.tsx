import React, { useMemo } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import Shareable from 'components/shareable/Shareable'
import { overScreenEquivalentInfographyValues } from 'components/shareable/overScreens/Values'
import InfographySimulator from './InfographySimulator'

const Infography = ({ equivalent, equivalents }: { equivalent: ComputedEquivalent; equivalents: string[] }) => {
  const overScreens = useMemo(
    () => overScreenEquivalentInfographyValues(equivalent, equivalents),
    [equivalent, equivalents]
  )

  return (
    <Shareable tracking={`${equivalent.name} infographie`} overScreens={overScreens} secondary=''>
      <InfographySimulator equivalents={equivalents} />
    </Shareable>
  )
}

export default Infography
