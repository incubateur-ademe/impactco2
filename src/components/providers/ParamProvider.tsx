import negaocterRules from '@incubateur-ademe/publicodes-negaoctet'
import { useRouter } from 'next/router'
import Engine, { ASTNode, PublicodesExpression } from 'publicodes'
import React, { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from 'react'
import { ComputedEquivalent, Equivalent } from 'types/equivalent'
import { Frequence } from 'types/livraison'
import { slugs } from 'utils/months'
import { searchAddress } from 'hooks/useAddress'
import { Point } from 'hooks/useItineraries'
import { getRandomEquivalents } from 'components/comparateur/random'
import useTheme from 'components/layout/Theme'
import { default_eqs, frequences } from 'components/livraison/data'
import { displayAddress } from 'components/transport/search/itinerary/Address'
import { computedEquivalents } from './equivalents'

const usageNumeriqueDefaultValues = {
  ['email . appareil']: "'smartphone'",
  ['email . transmission . émetteur . réseau']: "'fixe FR'",
  ['email . taille']: 0.075,
  ['streaming . durée']: 420,
  ['streaming . appareil']: "'TV'",
  ['streaming . transmission . réseau']: "'fixe FR'",
  ['streaming . qualité']: "'HD'",
  ['visio . durée']: 180,
  ['visio . appareil']: "'ordinateur portable'",
  ['visio . emplacements']: 2,
  ['visio . transmission . réseau']: "'fixe FR'",
  ['visio . qualité']: "'SD'",
}

const updateSituation = (
  engine: Engine,
  situation: Partial<Record<string, PublicodesExpression | ASTNode>>,
  localSituation: Partial<Record<string, PublicodesExpression | ASTNode>>,
  setSituation: Dispatch<SetStateAction<Partial<Record<string, PublicodesExpression | ASTNode>>>>
) => {
  const newSituation = { ...situation, ...localSituation }
  setSituation(newSituation)
  try {
    engine && engine.setSituation(newSituation)
  } catch (e) {
    console.error(e)
  }
}

const completeAddress = (setter: Dispatch<SetStateAction<Point | undefined>>, value?: string) => {
  if (value) {
    searchAddress(value, 1).then((result) => {
      if (result.length > 0) {
        const address = result[0]
        setter({
          latitude: address.geometry.coordinates[1],
          longitude: address.geometry.coordinates[0],
          city: address.properties.city,
          address: displayAddress(address),
        })
      }
    })
  }
}

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

type LivraisonValues = {
  produit: string
  retrait: string
  relay: string
  km: string
  traj: string
}

const ParamContext = React.createContext<{
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
  livraison: {
    values: LivraisonValues
    setValues: Dispatch<SetStateAction<LivraisonValues>>
    isHabit: boolean
    setIsHabit: Dispatch<SetStateAction<boolean>>
    isPlane: boolean
    setIsPlane: Dispatch<SetStateAction<boolean>>
    number: number
    setNumber: Dispatch<SetStateAction<number>>
    frequence: Frequence | undefined
    setFrequence: Dispatch<SetStateAction<Frequence | undefined>>
    equivalents: string[]
    setEquivalents: Dispatch<SetStateAction<string[]>>
  }
  comparateur: {
    weight: number
    baseValue: number
    setBaseValue: Dispatch<SetStateAction<number>>
    equivalents: string[]
    setEquivalents: (equivalents: string[]) => void
    tiles: Equivalent[]
    setTiles: Dispatch<SetStateAction<Equivalent[]>>
    comparedEquivalent: ComputedEquivalent | undefined
    setComparedEquivalent: (equivalent: ComputedEquivalent | undefined) => void
  }
  distance: {
    km: number
    setKm: Dispatch<SetStateAction<number>>
    carpool: number
    setCarpool: Dispatch<SetStateAction<number>>
    displayAll: boolean
    setDisplayAll: Dispatch<SetStateAction<boolean>>
  }
  itineraire: {
    start?: Point
    setStart: Dispatch<SetStateAction<Point | undefined>>
    end?: Point
    setEnd: Dispatch<SetStateAction<Point | undefined>>
    carpool: number
    setCarpool: Dispatch<SetStateAction<number>>
    displayAll: boolean
    setDisplayAll: Dispatch<SetStateAction<boolean>>
  }
  teletravail: {
    start?: Point
    setStart: Dispatch<SetStateAction<Point | undefined>>
    end?: Point
    setEnd: Dispatch<SetStateAction<Point | undefined>>
    carpool: number
    setCarpool: Dispatch<SetStateAction<number>>
    displayAll: boolean
    setDisplayAll: Dispatch<SetStateAction<boolean>>
    transport: string
    setTransport: Dispatch<SetStateAction<string>>
    presentiel: number
    setPresentiel: Dispatch<SetStateAction<number>>
    teletravail: number
    setTeletravail: Dispatch<SetStateAction<number>>
    holidays: number
    setHolidays: Dispatch<SetStateAction<number>>
    extraKm: number
    setExtraKm: Dispatch<SetStateAction<number>>
    days: number
    setDays: Dispatch<SetStateAction<number>>
  }
  chauffage: {
    m2: number
    setM2: Dispatch<SetStateAction<number>>
  }
  fruitsetlegumes: {
    month: number
    setMonth: Dispatch<SetStateAction<number>>
    search: string
    setSearch: Dispatch<SetStateAction<string>>
    sorting: string
    setSorting: Dispatch<SetStateAction<string>>
  }
  usageNumerique: {
    displayAll: boolean
    setDisplayAll: Dispatch<SetStateAction<boolean>>
    numberEmails: number
    setNumberEmails: Dispatch<SetStateAction<number>>
    situation: Partial<Record<string, PublicodesExpression | ASTNode>>
    setSituation: Dispatch<SetStateAction<Partial<Record<string, PublicodesExpression | ASTNode>>>>
    engine: Engine
  }
  email: {
    situation: Partial<Record<string, PublicodesExpression | ASTNode>>
    setSituation: Dispatch<SetStateAction<Partial<Record<string, PublicodesExpression | ASTNode>>>>
    engine: Engine
  }
  visio: {
    situation: Partial<Record<string, PublicodesExpression | ASTNode>>
    setSituation: Dispatch<SetStateAction<Partial<Record<string, PublicodesExpression | ASTNode>>>>
    engine: Engine
  }
  streaming: {
    situation: Partial<Record<string, PublicodesExpression | ASTNode>>
    setSituation: Dispatch<SetStateAction<Partial<Record<string, PublicodesExpression | ASTNode>>>>
    engine: Engine
  }
  'recherche web': {
    situation: Partial<Record<string, PublicodesExpression | ASTNode>>
    setSituation: Dispatch<SetStateAction<Partial<Record<string, PublicodesExpression | ASTNode>>>>
    engine: Engine
  }
  numerique: { displayAll: boolean; setDisplayAll: Dispatch<SetStateAction<boolean>> }
  habillement: { displayAll: boolean; setDisplayAll: Dispatch<SetStateAction<boolean>> }
  mobilier: { displayAll: boolean; setDisplayAll: Dispatch<SetStateAction<boolean>> }
  electromenager: { displayAll: boolean; setDisplayAll: Dispatch<SetStateAction<boolean>> }
  boisson: { displayAll: boolean; setDisplayAll: Dispatch<SetStateAction<boolean>> }
} | null>(null)

export function ParamProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  const initialTheme = useTheme()
  const [theme, setTheme] = useState(initialTheme.theme)

  useEffect(() => {
    setTheme(initialTheme.theme)
  }, [router.asPath])

  // Livraison
  const [livraisonValues, setLivraisonValues] = useState({
    produit: 'habillement',
    retrait: 'relais',
    relay: 'voiture_thermique',
    km: '7',
    traj: 'dom_tra',
  })
  const [livraisonEquivalents, setLivraisonEquivalents] = useState<string[]>(default_eqs)
  const [isHabit, setIsHabit] = useState(false)
  const [isPlane, setIsPlane] = useState(false)
  const [number, setNumber] = useState(1)
  const [frequence, setFrequence] = useState<Frequence | undefined>(frequences.find((freq) => freq.isDefault))

  // Comparateur
  const [baseValue, setBaseValue] = useState(10)
  const [equivalents, setEquivalents] = useState<string[]>([])
  const [tiles, setTiles] = useState<Equivalent[]>([])
  const [comparedEquivalent, setComparedEquivalent] = useState<ComputedEquivalent>()

  const internalComparedEquivalentSetter = (equivalent: ComputedEquivalent | undefined) => {
    const filteredEquivalent = equivalent ? equivalents.filter((slug) => slug !== equivalent.slug) : equivalents
    if (comparedEquivalent) {
      setEquivalents([...filteredEquivalent, comparedEquivalent.slug])
    } else {
      setEquivalents([...filteredEquivalent])
    }
    setBaseValue(10)
    setComparedEquivalent(equivalent)
  }

  // Chauffage
  const [m2, setM2] = useState(63)

  // Distance
  const [km, setKm] = useState(10)

  // Transport
  const [teletravailStart, setTeletravailStart] = useState<Point>()
  const [teletravailEnd, setTeletravailEnd] = useState<Point>()

  const [itineraireStart, setItineraireStart] = useState<Point>()
  const [itineraireEnd, setItineraireEnd] = useState<Point>()

  const [distanceCarpool, setDistanceCarpool] = useState(0)
  const [itineraireCarpool, setItineraireCarpool] = useState(0)
  const [teletravailCarpool, setTeletravailCarpool] = useState(0)

  const [distanceDisplayAll, setDistanceDisplayAll] = useState(false)
  const [itineraireDisplayAll, setItineraireDisplayAll] = useState(false)
  const [teletravailDisplayAll, settTletravailDisplayAll] = useState(false)

  // Teletravail
  const [teletravailTransport, setTeletravailTransport] = useState('')
  const [presentiel, setPresentiel] = useState(5)
  const [teletravail, setTeletravail] = useState(0)
  const [holidays, setHolidays] = useState(5)
  const [extraKm, setExtraKm] = useState(0.25)
  const [days, setDays] = useState(5)

  // Fruits et legumes
  const [month, setMonth] = useState<number>(new Date().getMonth())
  const [sorting, setSorting] = useState('alph_desc')
  const [search, setSearch] = useState('')

  // Usage Numérique
  const usageNumeriqueEngine = useMemo(
    () => new Engine(negaocterRules, { logger: { log: () => {}, warn: () => {}, error: () => {} } }),
    []
  )
  const [usageNumeriqueDisplayAll, setUsageNumeriqueDisplayAll] = useState(false)
  const [numberEmails, setNumberEmails] = useState<number>(50)
  const [localUsageNumeriqueSituation, setUsageNumeriqueSituation] =
    useState<Partial<Record<string, PublicodesExpression | ASTNode>>>(usageNumeriqueDefaultValues)
  const [usageNumeriqueSituation, setInternUsageNumeriqueSituation] =
    useState<Partial<Record<string, PublicodesExpression | ASTNode>>>(usageNumeriqueDefaultValues)

  useEffect(() => {
    updateSituation(
      usageNumeriqueEngine,
      usageNumeriqueSituation,
      localUsageNumeriqueSituation,
      setInternUsageNumeriqueSituation
    )
  }, [localUsageNumeriqueSituation])

  // Visio
  const visioEngine = useMemo(
    () => new Engine(negaocterRules, { logger: { log: () => {}, warn: () => {}, error: () => {} } }),
    []
  )
  const [localVisioSituation, setVisioSituation] =
    useState<Partial<Record<string, PublicodesExpression | ASTNode>>>(usageNumeriqueDefaultValues)
  const [visioSituation, setInternVisioSituation] =
    useState<Partial<Record<string, PublicodesExpression | ASTNode>>>(usageNumeriqueDefaultValues)

  useEffect(() => {
    updateSituation(visioEngine, visioSituation, localVisioSituation, setInternVisioSituation)
  }, [localVisioSituation])

  // Streaming
  const streamingEngine = useMemo(
    () => new Engine(negaocterRules, { logger: { log: () => {}, warn: () => {}, error: () => {} } }),
    []
  )
  const [localStreamingSituation, setStreamingSituation] =
    useState<Partial<Record<string, PublicodesExpression | ASTNode>>>(usageNumeriqueDefaultValues)
  const [streamingSituation, setInternStreamingSituation] =
    useState<Partial<Record<string, PublicodesExpression | ASTNode>>>(usageNumeriqueDefaultValues)

  useEffect(() => {
    updateSituation(streamingEngine, streamingSituation, localStreamingSituation, setInternStreamingSituation)
  }, [localStreamingSituation])

  // Email
  const emailEngine = useMemo(
    () => new Engine(negaocterRules, { logger: { log: () => {}, warn: () => {}, error: () => {} } }),
    []
  )
  const [localEmailSituation, setEmailSituation] =
    useState<Partial<Record<string, PublicodesExpression | ASTNode>>>(usageNumeriqueDefaultValues)
  const [emailSituation, setInternEmailSituation] =
    useState<Partial<Record<string, PublicodesExpression | ASTNode>>>(usageNumeriqueDefaultValues)

  useEffect(() => {
    updateSituation(emailEngine, emailSituation, localEmailSituation, setInternEmailSituation)
  }, [localEmailSituation])

  // Web
  const webEngine = useMemo(
    () => new Engine(negaocterRules, { logger: { log: () => {}, warn: () => {}, error: () => {} } }),
    []
  )
  const [localWebSituation, setWebSituation] =
    useState<Partial<Record<string, PublicodesExpression | ASTNode>>>(usageNumeriqueDefaultValues)
  const [webSituation, setInternWebSituation] =
    useState<Partial<Record<string, PublicodesExpression | ASTNode>>>(usageNumeriqueDefaultValues)

  useEffect(() => {
    updateSituation(webEngine, webSituation, localWebSituation, setInternWebSituation)
  }, [localWebSituation])

  // Numérique
  const [numeriqueDisplayAll, setNumeriqueDisplayAll] = useState(false)

  // Habillement
  const [habillementDisplayAll, setHabillementDisplayAll] = useState(false)

  // Mobilier
  const [mobilierDisplayAll, setMobilierDisplayAll] = useState(false)

  // Electromenager
  const [electromenagerDisplayAll, setElectromenagerDisplayAll] = useState(false)

  // Boisson
  const [boissonDisplayAll, setBoissonDisplayAll] = useState(false)

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (router.query.value) {
      const value = Number(router.query.value as string)
      if (!Number.isNaN(value)) {
        setBaseValue(value)
      }
    }
    if (router.query.equivalent) {
      setComparedEquivalent(computedEquivalents.find((equivalent) => equivalent.slug === router.query.equivalent))
    }

    if (router.query.comparisons) {
      setEquivalents((router.query.comparisons as string).split(','))
    } else {
      setEquivalents(getRandomEquivalents(router.query.equivalent as string, 3))
    }

    if (router.query.m2) {
      const m2 = Number.parseInt(router.query.m2 as string)
      if (!Number.isNaN(m2)) {
        setM2(m2)
      }
    }

    if (router.query.km) {
      const km = Number.parseInt(router.query.km as string)
      if (!Number.isNaN(km)) {
        setKm(km)
      }
    }
    completeAddress(setItineraireStart, (router.query.start || router.query.itineraireStart) as string)
    completeAddress(setItineraireEnd, (router.query.end || router.query.itineraireEnd) as string)
    completeAddress(setTeletravailStart, (router.query.start || router.query.teletravailStart) as string)
    completeAddress(setTeletravailEnd, (router.query.end || router.query.teletravailEnd) as string)

    if (router.query.month) {
      const monthIndex = Number.parseInt(router.query.month as string)
      if (!Number.isNaN(monthIndex)) {
        setMonth(monthIndex)
      } else {
        setMonth(slugs.indexOf(router.query.month as string))
      }
    }

    if (router.query.emails) {
      setNumberEmails(getInt(router.query, 'emails'))
    }

    const situation: Partial<Record<string, PublicodesExpression | ASTNode>> = {}
    if (router.query['email . appareil']) {
      situation['email . appareil'] = router.query['email . appareil'] as string
    }
    if (router.query['email . transmission . émetteur . réseau']) {
      situation['email . transmission . émetteur . réseau'] = router.query[
        'email . transmission . émetteur . réseau'
      ] as string
    }

    if (router.query['email . taille']) {
      situation['email . taille'] = getFloat(router.query, 'email . taille')
    }

    if (router.query['streaming . durée']) {
      situation['streaming . durée'] = getInt(router.query, 'streaming . durée')
    }

    if (router.query['streaming . appareil']) {
      situation['streaming . appareil'] = router.query['streaming . appareil'] as string
    }

    if (router.query['streaming . transmission . réseau']) {
      situation['streaming . transmission . réseau'] = router.query['streaming . transmission . réseau'] as string
    }

    if (router.query['streaming . qualité']) {
      situation['streaming . qualité'] = router.query['streaming . qualité'] as string
    }

    if (router.query['visio . durée']) {
      situation['visio . durée'] = getInt(router.query, 'visio . durée')
    }

    if (router.query['visio . appareil']) {
      situation['visio . appareil'] = router.query['visio . appareil'] as string
    }

    if (router.query['visio . emplacements']) {
      situation['visio . emplacements'] = getInt(router.query, 'visio . emplacements')
    }

    if (router.query['visio . transmission . réseau']) {
      situation['visio . transmission . réseau'] = router.query['visio . transmission . réseau'] as string
    }

    if (router.query['visio . qualité']) {
      situation['visio . qualité'] = router.query['visio . qualité'] as string
    }

    setUsageNumeriqueSituation(situation)
  }, [
    router,
    setM2,
    setKm,
    setItineraireStart,
    setItineraireEnd,
    setTeletravailStart,
    setTeletravailEnd,
    setMonth,
    setNumberEmails,
    setUsageNumeriqueSituation,
  ])

  return (
    <ParamContext.Provider
      value={{
        theme,
        setTheme,
        livraison: {
          values: livraisonValues,
          setValues: setLivraisonValues,
          equivalents: livraisonEquivalents,
          setEquivalents: setLivraisonEquivalents,
          isHabit,
          setIsHabit,
          isPlane,
          setIsPlane,
          number,
          setNumber,
          frequence,
          setFrequence,
        },
        comparateur: {
          weight: comparedEquivalent ? comparedEquivalent.value : 1,
          baseValue,
          setBaseValue,
          equivalents,
          setEquivalents,
          tiles,
          setTiles,
          comparedEquivalent,
          setComparedEquivalent: internalComparedEquivalentSetter,
        },
        distance: {
          km,
          setKm,
          carpool: distanceCarpool,
          setCarpool: setDistanceCarpool,
          displayAll: distanceDisplayAll,
          setDisplayAll: setDistanceDisplayAll,
        },
        itineraire: {
          start: itineraireStart,
          setStart: setItineraireStart,
          end: itineraireEnd,
          setEnd: setItineraireEnd,
          carpool: itineraireCarpool,
          setCarpool: setItineraireCarpool,
          displayAll: itineraireDisplayAll,
          setDisplayAll: setItineraireDisplayAll,
        },
        teletravail: {
          start: teletravailStart,
          setStart: setTeletravailStart,
          end: teletravailEnd,
          setEnd: setTeletravailEnd,
          carpool: teletravailCarpool,
          setCarpool: setTeletravailCarpool,
          displayAll: teletravailDisplayAll,
          setDisplayAll: settTletravailDisplayAll,
          transport: teletravailTransport,
          setTransport: setTeletravailTransport,
          presentiel,
          setPresentiel,
          teletravail,
          setTeletravail,
          holidays,
          setHolidays,
          extraKm,
          setExtraKm,
          days,
          setDays,
        },
        chauffage: {
          m2,
          setM2,
        },
        fruitsetlegumes: {
          month,
          setMonth,
          sorting,
          setSorting,
          search,
          setSearch,
        },
        usageNumerique: {
          displayAll: usageNumeriqueDisplayAll,
          setDisplayAll: setUsageNumeriqueDisplayAll,
          numberEmails,
          setNumberEmails,
          situation: usageNumeriqueSituation,
          setSituation: setUsageNumeriqueSituation,
          engine: usageNumeriqueEngine,
        },
        email: {
          situation: emailSituation,
          setSituation: setEmailSituation,
          engine: emailEngine,
        },
        visio: {
          situation: visioSituation,
          setSituation: setVisioSituation,
          engine: visioEngine,
        },
        streaming: {
          situation: streamingSituation,
          setSituation: setStreamingSituation,
          engine: streamingEngine,
        },
        'recherche web': {
          situation: webSituation,
          setSituation: setWebSituation,
          engine: webEngine,
        },
        numerique: {
          displayAll: numeriqueDisplayAll,
          setDisplayAll: setNumeriqueDisplayAll,
        },
        habillement: {
          displayAll: habillementDisplayAll,
          setDisplayAll: setHabillementDisplayAll,
        },
        electromenager: {
          displayAll: electromenagerDisplayAll,
          setDisplayAll: setElectromenagerDisplayAll,
        },
        mobilier: {
          displayAll: mobilierDisplayAll,
          setDisplayAll: setMobilierDisplayAll,
        },
        boisson: {
          displayAll: boissonDisplayAll,
          setDisplayAll: setBoissonDisplayAll,
        },
      }}>
      {children}
    </ParamContext.Provider>
  )
}

const useParamContext = () => {
  const context = useContext(ParamContext)

  if (!context) {
    throw new Error('useParamContext has to be used within <ParamProvider>')
  }

  return context
}

export default useParamContext
