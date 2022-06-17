import React, { useState } from 'react'

import DataContext from 'utils/DataContext'
import boisson from 'data/categories/boisson.json'
import deplacement from 'data/categories/deplacement.json'
import electromenager from 'data/categories/electromenager.json'
import habillement from 'data/categories/habillement.json'
import mobilier from 'data/categories/mobilier.json'
import numerique from 'data/categories/numerique.json'
import repas from 'data/categories/repas.json'
import categories from 'data/categories.json'
import ecv from 'data/ecv.json'

const equivalents = [
  ...boisson,
  ...deplacement,
  ...electromenager,
  ...habillement,
  ...mobilier,
  ...numerique,
  ...repas,
].map((equivalent) => ({ ...equivalent, id: equivalent.slug }))

export default function DataProvider(props) {
  const [tiles, setTiles] = useState([])

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
