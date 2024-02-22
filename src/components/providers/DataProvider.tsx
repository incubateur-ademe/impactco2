import React, { ReactNode, useContext } from 'react'
import { Category } from 'types/category'
import { ECV } from 'types/ecv'
import { Equivalent } from 'types/equivalent'
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

export const flattenEquivalents = (equivalents: Equivalent[]) =>
  equivalents.flatMap((equivalent) =>
    'ecvs' in equivalent && equivalent.ecvs
      ? equivalent.ecvs.map((ecv) => ({
          ...equivalent,
          ...ecv,
          slug: `${equivalent.name} ${ecv.subtitle}`.replace(/ /g, '').toLowerCase(),
        }))
      : [equivalent]
  )

const DataContext = React.createContext<{
  ecv: ECV[]
  equivalents: Equivalent[]
  categories: Category[]
} | null>(null)

export const equivalents = [
  ...boisson,
  ...flattenEquivalents(deplacement),
  ...electromenager,
  ...habillement,
  ...mobilier,
  ...numerique,
  ...usagenumerique,
  ...repas,
  ...chauffage,
  ...fruitsetlegumes,
  ...divers,
]

export function DataProvider({ children }: { children: ReactNode }) {
  return (
    <DataContext.Provider
      value={{
        equivalents,
        categories,
        ecv,
      }}>
      {children}
    </DataContext.Provider>
  )
}

const useDataContext = () => {
  const context = useContext(DataContext)

  if (!context) {
    throw new Error('useDataContext has to be used within <DataProvider>')
  }

  return context
}

export default useDataContext
