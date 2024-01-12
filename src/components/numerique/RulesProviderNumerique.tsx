import rules from '@incubateur-ademe/publicodes-negaoctet'
import { useRouter } from 'next/router'
import Engine, { ASTNode, PublicodesExpression } from 'publicodes'
import React, { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from 'react'
import useSituation from 'hooks/useSituation'

export const evaluateNumber = (engine: Engine, value: string) => {
  const result = engine.evaluate(value).nodeValue

  if (result === null || result === undefined) {
    throw new Error(`${value} cannot be evaluated`)
  }

  return result as number
}

const RulesContextNumerique = React.createContext<{
  engine: Engine
  situation: Partial<Record<string, PublicodesExpression | ASTNode>> | undefined
  setSituation: Dispatch<SetStateAction<Partial<Record<string, PublicodesExpression | ASTNode>> | undefined>>
  numberEmails: number
  setNumberEmails: Dispatch<SetStateAction<number>>
} | null>(null)

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
  const [numberEmails, setNumberEmails] = useState<number>(50)

  const { situation, setSituation } = useSituation(engine)

  useEffect(() => {
    if (router.isReady) {
      setNumberEmails(getInt(router.query, 'emails') || 50)
      setSituation({
        ['email . appareil']: (router.query['email . appareil'] as string) || "'smartphone'",
        ['email . transmission . émetteur . réseau']:
          (router.query['email . transmission . émetteur . réseau'] as string) || "'fixe FR'",
        ['email . taille']: getFloat(router.query, 'email . taille') || 0.075,
        ['streaming . durée']: getInt(router.query, 'streaming . durée') || 420,
        ['streaming . appareil']: (router.query['streaming . appareil'] as string) || "'TV'",
        ['streaming . transmission . réseau']:
          (router.query['streaming . transmission . réseau'] as string) || "'fixe FR'",
        ['streaming . qualité']: (router.query['streaming . qualité'] as string) || "'HD'",
        ['visio . durée']: getInt(router.query, 'visio . durée') || 180,
        ['visio . appareil']: (router.query['visio . appareil'] as string) || "'ordinateur portable'",
        ['visio . emplacements']: getInt(router.query, 'visio . emplacements') || 1,
        ['visio . transmission . réseau']: (router.query['visio . transmission . réseau'] as string) || "'fixe FR'",
        ['visio . qualité']: (router.query['visio . qualité'] as string) || "'SD'",
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

const useRulesContextNumerique = () => {
  const context = useContext(RulesContextNumerique)

  if (!context) {
    throw new Error('useRulesContextNumerique has to be used within <RulesProviderNumerique>')
  }

  return context
}

export default useRulesContextNumerique
