import rules from '@incubateur-ademe/publicodes-impact-livraison'
import Engine from 'publicodes'
import React, { useMemo } from 'react'
import useSituation from 'hooks/useSituation'

const RulesContextLivraison = React.createContext({})

export function RulesProviderLivraison(props) {
  // @Clemog: We make unit errors silent.
  const engine = useMemo(() => new Engine(rules, { logger: { log: () => {}, warn: () => {}, err: () => {} } }), [])

  const { situation, setSituation } = useSituation(engine, 'livraison', {})

  return (
    <RulesContextLivraison.Provider
      value={{
        engine,
        situation,
        setSituation,
      }}>
      {engine && props.children}
    </RulesContextLivraison.Provider>
  )
}

export default RulesContextLivraison
