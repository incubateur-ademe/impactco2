import React, { useState } from 'react'

import boisson from 'data/categories/boisson.json'
import deplacement from 'data/categories/deplacement.json'
import electromenager from 'data/categories/electromenager.json'
import habillement from 'data/categories/habillement.json'
import mobilier from 'data/categories/mobilier.json'
import numerique from 'data/categories/numerique.json'
import repas from 'data/categories/repas.json'
import chauffage from 'data/categories/chauffage.json'
import categories from 'data/categories.json'
import ecv from 'data/ecv.json'

const DataContext = React.createContext({})

const equivalents = [
  ...boisson,
  ...deplacement,
  ...electromenager,
  ...habillement,
  ...mobilier,
  ...numerique,
  ...repas,
  ...chauffage,
].map((equivalent) => ({ ...equivalent, id: equivalent.slug }))

export function DataProvider(props) {
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

export default DataContext
