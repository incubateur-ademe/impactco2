'use client'

import rules from '@incubateur-ademe/publicodes-negaoctet'
import Engine from 'publicodes'
import React, { ReactNode, useContext, useMemo } from 'react'

const UsageNumeriqueContext = React.createContext<{
  engine: Engine
} | null>(null)

export function UsageNumeriqueProvider({ children }: { children: ReactNode }) {
  // @Clemog: We make unit errors silent.
  const engine = useMemo(() => new Engine(rules, { logger: { log: () => {}, warn: () => {}, error: () => {} } }), [])

  return (
    <UsageNumeriqueContext.Provider
      value={{
        engine,
      }}>
      {engine && children}
    </UsageNumeriqueContext.Provider>
  )
}

const useUsageNumeriqueContext = () => {
  const context = useContext(UsageNumeriqueContext)

  if (!context) {
    throw new Error('useUsageNumeriqueContext has to be used within <UsageNumeriqueProvider>')
  }

  return context
}

export default useUsageNumeriqueContext
