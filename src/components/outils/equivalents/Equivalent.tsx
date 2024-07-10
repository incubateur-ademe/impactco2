'use client'

import React, { ReactNode, useMemo } from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import Shareable from 'components/shareable/Shareable'
import { overScreenEquivalentValues } from 'components/shareable/overScreens/Values'
import EquivalentSimulator from './simulators/EquivalentSimulator'

const Equivalent = ({
  category,
  equivalent,
  simulator,
}: {
  category: Category
  equivalent: ComputedEquivalent
  simulator?: ReactNode
}) => {
  const overScreens = useMemo(() => overScreenEquivalentValues(equivalent), [equivalent])

  return (
    <Shareable slug={equivalent.slug} tracking={getName('fr', equivalent)} overScreens={overScreens}>
      {simulator || <EquivalentSimulator category={category} equivalent={equivalent} />}
    </Shareable>
  )
}

export default Equivalent
