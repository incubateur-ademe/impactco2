import React, { useState } from 'react'
import categories from 'data/categories.json'
import boisson from 'data/categories/boisson.json'
import chauffage from 'data/categories/chauffage.json'
import deplacement from 'data/categories/deplacement.json'
import divers from 'data/categories/divers.json'
import electromenager from 'data/categories/electromenager.json'
import fruitsetlegumes from 'data/categories/fruitsetlegumes.json'
import habillement from 'data/categories/habillement.json'
import mobilier from 'data/categories/mobilier.json'
import numerique from 'data/categories/numerique.json'
import repas from 'data/categories/repas.json'
import usagenumerique from 'data/categories/usagenumerique.json'
import ecv from 'data/ecv.json'

const DataContext = React.createContext({})

const equivalents = [
  ...boisson,
  ...deplacement,
  ...electromenager,
  ...habillement,
  ...mobilier,
  ...numerique,
  ...usagenumerique,
  ...repas,
  ...chauffage,
  ...fruitsetlegumes,
  ...divers,
].map((equivalent) => ({ ...equivalent, id: equivalent.slug }))

export function DataProvider(props) {
  const [tiles, setTiles] = useState([])

  const [eqvTarget, setEqvTarget] = useState('')

  return (
    <DataContext.Provider
      value={{
        equivalents,
        categories,
        ecv,
        eqvTarget,
        setEqvTarget,
        tiles,
        setTiles,
      }}>
      {props.children}
    </DataContext.Provider>
  )
}

export default DataContext
