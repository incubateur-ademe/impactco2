import React, { useMemo } from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import Shareable from 'components/shareable/Shareable'
import { overScreenEquivalentValues } from 'components/shareable/overScreens/Values'
import EquivalentSimulator from './simulators/EquivalentSimulator'
import { equivalentsSimulators } from './simulators/equivalentsSimulators'

const Equivalent = ({ category, equivalent }: { category: Category; equivalent: ComputedEquivalent }) => {
  const overScreens = useMemo(() => overScreenEquivalentValues(equivalent), [equivalent])

  return (
    <Shareable tracking={getName('fr', equivalent)} overScreens={overScreens}>
      {equivalentsSimulators[equivalent.slug] || <EquivalentSimulator category={category} equivalent={equivalent} />}
    </Shareable>
  )
}

export default Equivalent
