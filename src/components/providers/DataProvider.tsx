import React, { ReactNode, useContext } from 'react'
import { Category } from 'types/category'
import { ECV } from 'types/ecv'
import { Equivalent } from 'types/equivalent'
import categories from 'data/categories.json'
import ecv from 'data/ecv.json'
import { computedEquivalents } from './equivalents'

const DataContext = React.createContext<{
  ecv: ECV[]
  equivalents: Equivalent[]
  categories: Category[]
} | null>(null)
export function DataProvider({ children }: { children: ReactNode }) {
  return (
    <DataContext.Provider
      value={{
        equivalents: computedEquivalents,
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
