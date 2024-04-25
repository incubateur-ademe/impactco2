'use client'

import negaocterRules from '@incubateur-ademe/publicodes-negaoctet'
import Engine, { ASTNode, PublicodesExpression } from 'publicodes'
import React, { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from 'react'
import { ComputedEquivalent, Equivalent } from 'types/equivalent'
import { Frequence } from 'types/livraison'
import { TransportSimulateur } from 'types/transport'
import { Point } from 'hooks/useItineraries'
import useTheme from 'components/layout/UseTheme'
import { default_eqs, frequences } from 'components/livraison/data'

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

type LivraisonValues = {
  produit: string
  retrait: string
  relay: string
  km: string
  traj: string
}

export type Params = {
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
  language: 'fr' | 'en'
  setLanguage: Dispatch<SetStateAction<'fr' | 'en'>>
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
  transport: {
    selected: TransportSimulateur | undefined
    setSelected: Dispatch<SetStateAction<TransportSimulateur | undefined>>
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
}

const ParamContext = React.createContext<Params | null>(null)

export function ParamProvider({ children }: { children: ReactNode }) {
  const initialTheme = useTheme()
  const [theme, setTheme] = useState(initialTheme.theme)
  const [language, setLanguage] = useState<'fr' | 'en'>('fr')

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
  const [baseValue, setBaseValue] = useState(100)
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
    setBaseValue(100)
    setComparedEquivalent(equivalent)
  }

  // Chauffage
  const [m2, setM2] = useState(63)

  // Distance
  const [km, setKm] = useState(10)

  // Transport
  const [selected, setSelected] = useState<TransportSimulateur>()

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

  return (
    <ParamContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
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
          weight: comparedEquivalent ? comparedEquivalent.value / (comparedEquivalent.percentage ? 100 : 1) : 1,
          baseValue,
          setBaseValue,
          equivalents,
          setEquivalents,
          tiles,
          setTiles,
          comparedEquivalent,
          setComparedEquivalent: internalComparedEquivalentSetter,
        },
        transport: {
          selected,
          setSelected,
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
