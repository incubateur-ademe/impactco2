import { useMemo } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import Shareable from 'components/shareable/Shareable'
import { overScreenEquivalentInfographyValues } from 'components/shareable/overScreens/Values/Infography'
import InfographySimulator from './InfographySimulator'

const Infography = ({ equivalent, equivalents }: { equivalent: ComputedEquivalent; equivalents: string[] }) => {
  const overScreens = useMemo(
    () => overScreenEquivalentInfographyValues(equivalent, equivalents),
    [equivalent, equivalents]
  )
  return (
    <Shareable
      slug='infographie'
      tracking={`${getName('fr', equivalent)} infographie`}
      overScreens={overScreens}
      secondary=''
      smallPadding>
      <InfographySimulator equivalents={equivalents} />
    </Shareable>
  )
}

export default Infography
