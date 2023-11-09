import rules from '@incubateur-ademe/publicodes-negaoctet'
import Engine from 'publicodes'
import React, { useMemo } from 'react'
import useSituation from 'hooks/useSituation'

const RulesContextNumerique = React.createContext({})

export function RulesProviderNumerique(props) {
  // @Clemog: We make unit errors silent.
  const engine = useMemo(() => new Engine(rules), [])

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
