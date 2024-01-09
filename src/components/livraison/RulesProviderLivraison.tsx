import rules from '@incubateur-ademe/publicodes-impact-livraison'
import Engine, { ASTNode, PublicodesExpression } from 'publicodes'
import React, { Dispatch, ReactNode, SetStateAction, useContext, useMemo } from 'react'
import useSituation from 'hooks/useSituation'

const RulesContextLivraison = React.createContext<{
  engine: Engine
  situation: Partial<Record<string, PublicodesExpression | ASTNode>> | undefined
  setSituation: Dispatch<SetStateAction<Partial<Record<string, PublicodesExpression | ASTNode>> | undefined>>
} | null>(null)

export function RulesProviderLivraison({ children }: { children: ReactNode }) {
  // @Clemog: We make unit errors silent.
  const engine = useMemo(() => new Engine(rules, { logger: { log: () => {}, warn: () => {}, error: () => {} } }), [])

  const { situation, setSituation } = useSituation(engine)

  return (
    <RulesContextLivraison.Provider
      value={{
        engine,
        situation,
        setSituation,
      }}>
      {engine && children}
    </RulesContextLivraison.Provider>
  )
}

const useRulesContextLivraison = () => {
  const context = useContext(RulesContextLivraison)

  if (!context) {
    throw new Error('useRulesContextLivraison has to be used within <RulesProviderLivraison>')
  }

  return context
}

export default useRulesContextLivraison
