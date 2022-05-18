import React, { useState, useEffect } from 'react'

import DataContext from 'utils/DataContext'
import boisson from 'data/categories/boisson.json'
import deplacement from 'data/categories/deplacement.json'
import electromenager from 'data/categories/electromenager.json'
import habillement from 'data/categories/habillement.json'
import mobilier from 'data/categories/mobilier.json'
import numerique from 'data/categories/numerique.json'
import repas from 'data/categories/repas.json'
import categoriesData from 'data/categories.json'
import ecvData from 'data/ecv.json'

export default function DataProvider(props) {
  const [equivalents, setEquivalents] = useState([])

  const [categories, setCategories] = useState([])

  const [ecv, setEcv] = useState([])

  const [tiles, setTiles] = useState([])

  useEffect(() => {
    setEquivalents([
      ...boisson,
      ...deplacement,
      ...electromenager,
      ...habillement,
      ...mobilier,
      ...numerique,
      ...repas,
    ])
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
