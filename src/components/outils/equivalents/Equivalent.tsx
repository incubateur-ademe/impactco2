'use client'

import React, { ReactNode, useMemo, useState } from 'react'
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
  const [overScreen, setOverScreen] = useState<string | undefined>()
  const overScreens = useMemo(() => overScreenEquivalentValues(equivalent), [equivalent])

  return (
    <Shareable
      tracking={getName('fr', equivalent)}
      overScreen={overScreen ? overScreens[overScreen] : undefined}
      setOverScreen={setOverScreen}>
      {simulator || <EquivalentSimulator category={category} equivalent={equivalent} setOverscreen={setOverScreen} />}
    </Shareable>
  )
}

export default Equivalent
