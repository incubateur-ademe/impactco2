'use client'

import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { ASTNode, PublicodesExpression } from 'publicodes'
import { useEffect } from 'react'
import { usageNumeriqueDefaultValues } from 'utils/usageNumerique'
import { useUsageNumeriqueStore } from './usageNumerique'

const getInt = (query: ReadonlyURLSearchParams, key: string) => {
  const number = Number.parseInt(query.get(key) as string)
  if (Number.isNaN(number)) {
    return 0
  }
  return number
}

const getFloat = (query: ReadonlyURLSearchParams, key: string) => {
  const number = Number.parseFloat(query.get(key) as string)
  if (Number.isNaN(number)) {
    return 0
  }
  return number
}

const UsageNumeriqueSync = () => {
  const searchParams = useSearchParams()
  const { setSituation, setNumberEmails, setEquivalents, setMode } = useUsageNumeriqueStore()

  useEffect(() => {
    if (!searchParams) {
      return
    }

    if (searchParams.get('emails')) {
      setNumberEmails(getInt(searchParams, 'emails'))
    }
    if (searchParams.get('display')) {
      setMode(searchParams.get('display') as string)
    }

    const situation: Partial<Record<string, PublicodesExpression | ASTNode>> = { ...usageNumeriqueDefaultValues }
    if (searchParams.get('email . appareil')) {
      situation['email . appareil'] = searchParams.get('email . appareil') as string
    }
    if (searchParams.get('email . transmission . émetteur . réseau')) {
      situation['email . transmission . émetteur . réseau'] = searchParams.get(
        'email . transmission . émetteur . réseau'
      ) as string
    }

    if (searchParams.get('email . taille')) {
      situation['email . taille'] = getFloat(searchParams, 'email . taille')
    }

    if (searchParams.get('streaming . durée')) {
      situation['streaming . durée'] = getInt(searchParams, 'streaming . durée')
    }

    if (searchParams.get('streaming . appareil')) {
      situation['streaming . appareil'] = searchParams.get('streaming . appareil') as string
    }

    if (searchParams.get('streaming . transmission . réseau')) {
      situation['streaming . transmission . réseau'] = searchParams.get('streaming . transmission . réseau') as string
    }

    if (searchParams.get('streaming . qualité')) {
      situation['streaming . qualité'] = searchParams.get('streaming . qualité') as string
    }

    if (searchParams.get('visio . durée')) {
      situation['visio . durée'] = getInt(searchParams, 'visio . durée')
    }

    if (searchParams.get('visio . appareil')) {
      situation['visio . appareil'] = searchParams.get('visio . appareil') as string
    }

    if (searchParams.get('visio . emplacements')) {
      situation['visio . emplacements'] = getInt(searchParams, 'visio . emplacements')
    }

    if (searchParams.get('visio . transmission . réseau')) {
      situation['visio . transmission . réseau'] = searchParams.get('visio . transmission . réseau') as string
    }

    if (searchParams.get('visio . qualité')) {
      situation['visio . qualité'] = searchParams.get('visio . qualité') as string
    }

    setSituation(situation)
  }, [searchParams, setSituation, setNumberEmails, setEquivalents, setMode])

  return null
}

export default UsageNumeriqueSync
