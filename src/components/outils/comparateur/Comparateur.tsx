'use client'

import React, { useMemo, useState } from 'react'
import Shareable from 'components/misc/shareable/Shareable'
import { overScreenComparateurValues } from 'components/misc/shareable/overScreens/Values'
import ComparateurSimulator from './ComparateurSimulator'

const Comparateur = () => {
  const [overScreen, setOverScreen] = useState<string | undefined>()
  const overScreens = useMemo(() => overScreenComparateurValues(() => setOverScreen(undefined)), [])

  return (
    <Shareable
      tracking='Comparateur'
      overScreen={overScreen ? overScreens[overScreen] : undefined}
      setOverScreen={setOverScreen}>
      <ComparateurSimulator setOverScreen={(key) => setOverScreen(key)} />
    </Shareable>
  )
}

export default Comparateur
