import React, { useState, useMemo } from 'react'
import Engine from 'publicodes'

import useSituation from 'hooks/useSituation'
import rules from 'data/rules.json'

const RulesContext = React.createContext({})

export function RulesProvider(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const engine = useMemo(() => new Engine(rules), [rules])

  const { situation, setSituation } = useSituation(engine)

  return (
    <RulesContext.Provider
      value={{
        engine,
        situation,
        setSituation,
      }}
    >
      {props.children}
    </RulesContext.Provider>
  )
}

export default RulesContext
