import React from 'react'
import Shareable from 'components/shareable/Shareable'
import { overScreenComparateurValues } from 'components/shareable/overScreens/Values'
import ComparateurSimulator from './ComparateurSimulator'

const Comparateur = () => {
  return (
    <Shareable slug='comparateur' tracking='Comparateur' overScreens={overScreenComparateurValues}>
      <ComparateurSimulator />
    </Shareable>
  )
}

export default Comparateur
