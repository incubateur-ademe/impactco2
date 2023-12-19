import rules from '@incubateur-ademe/publicodes-negaoctet'
import Engine from 'publicodes'
import React, { useMemo } from 'react'
import useSituation from 'hooks/useSituation'

const RulesContextNumerique = React.createContext({})

export function RulesProviderNumerique(props) {
  // @Clemog: We make unit errors silent.
  const engine = useMemo(() => new Engine(rules, { logger: { log: () => {}, warn: () => {}, err: () => {} } }), [])

  const { prevSituation, situation, setSituation } = useSituation(engine, {
    'email . appareil': `'smartphone'`,
    'email . taille': 0.075,
    'email . transmission . émetteur . réseau': `'fixe FR'`,
    'streaming . durée': 420,
    'streaming . appareil': `'TV'`,
    'streaming . qualité': `'HD'`,
    'streaming . transmission . réseau': `'fixe FR'`,
    'visio . appareil': `'ordinateur portable'`,
    'visio . qualité': `'SD'`,
    'visio . durée': 180,
    'visio . transmission . réseau': `'fixe FR'`,
    'visio . emplacements': 1,
  })

  return (
    <RulesContextNumerique.Provider
      value={{
        engine,
        prevSituation,
        situation,
        setSituation,
      }}>
      {engine && props.children}
    </RulesContextNumerique.Provider>
  )
}

export default RulesContextNumerique
