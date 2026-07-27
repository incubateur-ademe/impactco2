'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import useParamContext, { Params } from 'src/providers/ParamProvider'
import { getSource } from 'src/utils/matomo'
import CloseIcon from '../base/icons/close'
import Learn from './Learn'
import NPS from './NPS'
import styles from './UserFeedback.module.css'

const NPS_SEEN_STORAGE_KEY = 'impactco2_nps_seen_at'
const NPS_SEEN_TTL =
  (process.env.NEXT_PUBLIC_NPS_RESET_TIME_SECONDS
    ? parseInt(process.env.NEXT_PUBLIC_NPS_RESET_TIME_SECONDS, 10)
    : 30 * 24 * 60 * 60) * 1000

const getTimeout = (tracking: string, pathname: string, searchParams: URLSearchParams, params: Params) => {
  switch (tracking) {
    case 'Transport':
      const initialKm = searchParams.get('km') ? parseInt(searchParams.get('km') || '0', 10) : 10
      if (params.distance.km && initialKm !== params.distance.km) {
        // L'utilisateur a rempli une distance
        return 20000
      }

      if (params.itineraire.start && params.itineraire.end) {
        // L'utilisateur a rempli un itinéraire
        return 20000
      }

      // L'utilisateur n'a pas encore engagé avec l'outil, timeout en fonction de l'outil
      const tabs = searchParams.get('tabs')
      if (tabs === 'itineraire') {
        return null
      } else if (tabs === 'distance') {
        return 45000
      }

      if (pathname.includes('itineraire')) {
        return null
      }
      break
    case 'Fruits et légumes':
      const initialFruitsLegumes = searchParams.get('fruitsLegumes')
        ? parseInt(searchParams.get('fruitsLegumes') || '0', 10)
        : new Date().getMonth()
      if (initialFruitsLegumes !== params.fruitsetlegumes.month) {
        return 20000
      }
      break
    case 'Livraison':
      const types = searchParams.get('types')
      const initialType = types ? (types.split(',')[0] as string) : 'courses'
      const initialFabrication = searchParams.get('withFabrication') === 'true'
      if (initialType !== params.livraison.type || initialFabrication !== params.livraison.withFabrication) {
        return 20000
      }
      break
    case 'Chauffage':
      const initialChauffage = searchParams.get('m2') ? parseInt(searchParams.get('m2') || '0', 10) : 63
      if (initialChauffage !== params.chauffage.m2) {
        return 20000
      }
      break
    case 'Usage numérique':
      if (params.usageNumerique.modified) {
        return 20000
      }
      break
    case 'Comparateur':
      if (params.comparateur.modified) {
        return 20000
      }
      const initialValue = searchParams.get('value') ? parseInt(searchParams.get('value') || '0', 10) : 100
      if (initialValue !== params.comparateur.baseValue) {
        return 20000
      }
      const initialEquivalent = searchParams.get('equivalent') || ''
      if (initialEquivalent !== (params.comparateur.comparedEquivalent?.slug || '')) {
        return 20000
      }
      break
    case 'Télétravail':
      if (params.teletravail.start && params.teletravail.end) {
        return 20000
      }
      break
    case 'Quiz':
      if (params.quiz.done) {
        return 20000
      }
      return null
    case 'Livraison etiquette':
      return 20000
  }

  return 45000
}
const exceptions = ['https://nosgestesclimat.fr', 'https://jagis.beta.gouv.fr']

const UserFeedback = ({ tracking, small }: { tracking: string; small?: boolean }) => {
  // eslint-disable-next-line react-hooks/purity
  const type = useMemo(() => (tracking === 'Transport' && Math.random() < 0.5 ? 'learn' : 'nps'), [])
  const t = useTranslations('nps')
  const searchParams = useSearchParams()
  const params = useParamContext()

  const [display, setDisplay] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [large, setLarge] = useState(false)
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    const source = getSource()
    if (exceptions.some((exception) => source.startsWith(exception))) {
      setBlocked(true)
      return
    }

    const seenAtRaw = localStorage.getItem(NPS_SEEN_STORAGE_KEY)
    if (!seenAtRaw) {
      return
    }

    const seenAt = Number.parseInt(seenAtRaw, 10)
    if (Number.isNaN(seenAt)) {
      localStorage.removeItem(NPS_SEEN_STORAGE_KEY)
      return
    }

    if (Date.now() - seenAt < NPS_SEEN_TTL) {
      setBlocked(true)
      return
    }

    localStorage.removeItem(NPS_SEEN_STORAGE_KEY)
  }, [])

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (blocked) {
      return
    }

    if (display) {
      return
    }

    const timeout = getTimeout(tracking, window.location.pathname, searchParams, params)
    console.log(timeout)
    if (timeout !== null) {
      timeoutRef.current = setTimeout(() => {
        localStorage.setItem(NPS_SEEN_STORAGE_KEY, Date.now().toString())
        setDisplay(true)
      }, timeout)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [display, tracking, searchParams, params, blocked])

  if (closed) {
    return null
  }

  if (blocked) {
    return null
  }

  if (!display) {
    return null
  }

  return (
    <div className={classNames(styles.parent, { [styles.small]: small })}>
      <div
        className={classNames(styles.container, {
          [styles.npsContainer]: type === 'nps',
          [styles.largeContainer]: large,
        })}>
        <button className={styles.closeButton} onClick={() => setClosed(true)} title={t('close')}>
          <CloseIcon />
        </button>
        {type === 'nps' && (
          <NPS tracking={tracking} transportTabSelected={params.transport.selected} setClosed={setClosed} />
        )}
        {type === 'learn' && (
          <Learn
            tracking={tracking}
            transportTabSelected={params.transport.selected}
            setClosed={setClosed}
            setLarge={setLarge}
          />
        )}
      </div>
    </div>
  )
}

export default UserFeedback
