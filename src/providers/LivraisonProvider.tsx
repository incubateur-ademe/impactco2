'use client'

import rules from '@incubateur-ademe/publicodes-impact-livraison'
import Engine from 'publicodes'
import React, { ReactNode, useContext, useMemo } from 'react'

const LivraisonContext = React.createContext<{
  engine: Engine
} | null>(null)

export function LivraisonProvider({ children }: { children: ReactNode }) {
  // @Clemog: We make unit errors silent.
  const engine = useMemo(() => new Engine(rules, { logger: { log: () => {}, warn: () => {}, error: () => {} } }), [])

  return (
    <LivraisonContext.Provider
      value={{
        engine,
      }}>
      {engine && children}
    </LivraisonContext.Provider>
  )
}

const useLivraisonContext = () => {
  const context = useContext(LivraisonContext)

  if (!context) {
    throw new Error('useLivraisonContext has to be used within <LivraisonProvider>')
  }

  return context
}

export default useLivraisonContext
