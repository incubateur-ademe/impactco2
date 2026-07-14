'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { getSource } from 'src/utils/matomo'
import { Point } from 'src/hooks/useItineraries'
import CloseIcon from '../base/icons/close'
import Learn from './Learn'
import NPS from './NPS'
import styles from './UserFeedback.module.css'

const NPS_SEEN_STORAGE_KEY = 'impactco2_nps_seen_at'
const NPS_SEEN_TTL =
  (process.env.NEXT_PUBLIC_NPS_RESET_TIME_SECONDS
    ? parseInt(process.env.NEXT_PUBLIC_NPS_RESET_TIME_SECONDS, 10)
    : 30 * 24 * 60 * 60) * 1000

const getTimeout = (
  pathname: string,
  params: URLSearchParams,
  { km, start, end }: { km: number; start?: Point; end?: Point }
) => {
  const initialKm = params.get('km') ? parseInt(params.get('km') || '0', 10) : 10
  if (km && initialKm !== km) {
    // L'utilisateur a rempli une distance
    return 20000
  }

  if (start && end) {
    // L'utilisateur a rempli un itinéraire
    return 20000
  }

  // L'utilisateur n'a pas encore engagé avec l'outil, timeout en fonction de l'outil
  const tabs = params.get('tabs')
  if (tabs === 'itineraire') {
    return null
  } else if (tabs === 'distance') {
    return 45000
  }

  if (pathname.includes('itineraire')) {
    return null
  }

  return 45000
}
const exceptions = ['https://nosgestesclimat.fr', 'https://jagis.beta.gouv.fr']

const UserFeedback = ({ tracking }: { tracking: string }) => {
  // eslint-disable-next-line react-hooks/purity
  const type = useMemo(() => (Math.random() < 0.5 ? 'nps' : 'learn'), [])
  const t = useTranslations('nps')
  const searchParams = useSearchParams()
  const {
    distance: { km },
    itineraire: { start, end },
    transport: { selected: transportTabSelected },
  } = useParamContext()

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

    const timeout = getTimeout(window.location.pathname, searchParams, { km, start, end })
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
  }, [display, tracking, searchParams, km, start, end, blocked])

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
    <div className={styles.parent}>
      <div
        className={classNames(styles.container, {
          [styles.npsContainer]: type === 'nps',
          [styles.largeContainer]: large,
        })}>
        <button className={styles.closeButton} onClick={() => setClosed(true)} title={t('close')}>
          <CloseIcon />
        </button>
        {type === 'nps' && (
          <NPS tracking={tracking} transportTabSelected={transportTabSelected} setClosed={setClosed} />
        )}
        {type === 'learn' && (
          <Learn
            tracking={tracking}
            transportTabSelected={transportTabSelected}
            setClosed={setClosed}
            setLarge={setLarge}
          />
        )}
      </div>
    </div>
  )
}

export default UserFeedback
