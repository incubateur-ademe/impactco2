import React, { useContext } from 'react'

import DataContext from 'utils/DataContext'
import Search from 'components/misc/Search'
import Visualization from './equivalents/Visualizations'
import Tiles from 'components/misc/Tiles'

export default function Equivalents() {
  const { currentEquivalent } = useContext(DataContext)

  return (
    <>
      <Search type='equivalents' />
      <Visualization
        equivalent={currentEquivalent}
        weight={currentEquivalent?.total}
      />
    </>
  )
}
