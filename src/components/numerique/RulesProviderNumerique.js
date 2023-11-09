import rules from '@incubateur-ademe/publicodes-negaoctet'
import Engine from 'publicodes'
import React, { useMemo } from 'react'
import useSituation from 'hooks/useSituation'

const RulesContextNumerique = React.createContext({})

export function RulesProviderNumerique(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // @Clemog: We make unit errors silent.
  const engine = useMemo(() => new Engine(rules, { logger: { log: () => {}, warn: () => {}, err: () => {} } }), [])

  const { situation, setSituation } = useSituation(engine)

  return (
    <RulesContextNumerique.Provider
      value={{
        engine,
        situation,
        setSituation,
      }}>
      {engine && props.children}
    </RulesContextNumerique.Provider>
  )
}

export default RulesContextNumerique
