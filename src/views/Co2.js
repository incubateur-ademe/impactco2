import React, { useContext } from 'react'
import Search from '../components/misc/Search'

import DataContext from 'utils/DataContext'
import Tiles from 'components/misc/Tiles'

export default function Co2() {
  const { weight } = useContext(DataContext)

  return (
    <>
      <Search type='co2' />
      <Tiles weight={weight} title />
    </>
  )
}
