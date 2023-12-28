import rules from '@incubateur-ademe/publicodes-negaoctet'
import { useRouter } from 'next/router'
import Engine from 'publicodes'
import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import useSituation from 'hooks/useSituation'

const RulesContextNumerique = React.createContext({})

const getInt = (query: Record<string, string | string[] | undefined>, key: string) => {
  const number = Number.parseInt(query[key] as string)
  if (Number.isNaN(number)) {
    return 0
  }
  return number
}

const getFloat = (query: Record<string, string | string[] | undefined>, key: string) => {
  const number = Number.parseFloat(query[key] as string)
  if (Number.isNaN(number)) {
    return 0
  }
  return number
}

export function RulesProviderNumerique({ children }: { children: ReactNode }) {
  const router = useRouter()

  // @Clemog: We make unit errors silent.
  const engine = useMemo(() => new Engine(rules, { logger: { log: () => {}, warn: () => {}, error: () => {} } }), [])
  const [numberEmails, setNumberEmails] = useState<number>()

  const { situation, setSituation } = useSituation(engine)

  useEffect(() => {
    if (router.isReady) {
      setNumberEmails(getInt(router.query, 'emails') || 50)
      setSituation({
        ['email . appareil']: router.query['email . appareil'] || "'smartphone'",
        ['email . transmission . émetteur . réseau']:
          router.query['email . transmission . émetteur . réseau'] || "'fixe FR'",
        ['email . taille']: getFloat(router.query, 'email . taille') || 0.075,
        ['streaming . durée']: getInt(router.query, 'streaming . durée') || 420,
        ['streaming . appareil']: router.query['streaming . appareil'] || "'TV'",
        ['streaming . transmission . réseau']: router.query['streaming . transmission . réseau'] || "'fixe FR'",
        ['streaming . qualité']: router.query['streaming . qualité'] || "'HD'",
        ['visio . durée']: getInt(router.query, 'visio . durée') || 180,
        ['visio . appareil']: router.query['visio . appareil'] || "'ordinateur portable'",
        ['visio . emplacements']: getInt(router.query, 'visio . emplacements') || 1,
        ['visio . transmission . réseau']: router.query['visio . transmission . réseau'] || "'fixe FR'",
        ['visio . qualité']: router.query['visio . qualité'] || "'SD'",
      })
    }
  }, [router, setSituation, setNumberEmails])

  return (
    <RulesContextNumerique.Provider
      value={{
        engine,
        situation,
        setSituation,
        numberEmails,
        setNumberEmails,
      }}>
      {numberEmails !== undefined && engine && children}
    </RulesContextNumerique.Provider>
  )
}

export default RulesContextNumerique
