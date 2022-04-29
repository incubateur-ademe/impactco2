import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'

import DataContext from 'utils/DataContext'
import equivalentsData from 'data/equivalents.json'
import categoriesData from 'data/categories.json'
import ecvData from 'data/ecv.json'

export default function DataProvider(props) {
  const [equivalents, setEquivalents] = useState([])

  const [categories, setCategories] = useState([])

  const [ecv, setEcv] = useState([])

  const [tiles, setTiles] = useState([])

  useEffect(() => {
    setEquivalents(equivalentsData)
    setCategories(categoriesData)
    setEcv(ecvData)
  }, [])

  return (
    <DataContext.Provider
      value={{
        equivalents,
        categories,
        ecv,
        tiles,
        setTiles,
      }}
    >
      {props.children}
    </DataContext.Provider>
  )
}
