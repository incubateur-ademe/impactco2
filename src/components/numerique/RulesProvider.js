import Engine from 'publicodes'
import React, { useMemo } from 'react'

import useRules from 'hooks/useRules'
import useSituation from 'hooks/useSituation'

const RulesContext = React.createContext({})

export function RulesProvider(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const { data: rules } = useRules()
  const engine = useMemo(() => (rules ? new Engine(rules) : null), [rules])

  const { situation, setSituation } = useSituation(engine)

  return (
    <RulesContext.Provider
      value={{
        engine,
        situation,
        setSituation,
      }}
    >
      {engine && props.children}
    </RulesContext.Provider>
  )
}

export default RulesContext
