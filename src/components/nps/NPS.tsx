'use client'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { addNpsNote, updateNpsRetour } from 'src/serverFunctions/nps'
import { getSource } from 'src/utils/matomo'
import { Point } from 'src/hooks/useItineraries'
import Button from '../base/buttons/Button'
import CloseIcon from '../base/icons/close'
import TextArea from '../form/TextArea'
import ScoreInput from './ScoreInput'
import styles from './NPS.module.css'

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

const NPS = ({ tracking }: { tracking: string }) => {
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

  const [selected, setSelected] = useState<number | null>(null)
  const [text, setText] = useState('')
  const [step, setStep] = useState(0)
  const [id, setId] = useState('')
  const [closed, setClosed] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const send = async () => {
    if (sending) {
      return
    }

    setError(false)
    setSending(true)
    try {
      switch (step) {
        case 0:
          if (selected === null) {
            return
          }
          const tabs = searchParams.get('tabs')
          const start = searchParams.get('itineraireStart')
          const end = searchParams.get('itineraireEnd')

          const createdId = await addNpsNote({
            note: selected,
            tracking: `${tracking} ${transportTabSelected}`,
            source: getSource(),
            params: [tabs ? `tabs=${tabs}` : null, start ? 'start' : null, end ? 'end' : null]
              .filter(Boolean)
              .join(','),
          })
          if (!createdId) {
            setError(true)
            return
          }
          setId(createdId)
          setStep(1)
          return
        case 1:
          if (!id || !text.trim()) {
            return
          }
          const updated = await updateNpsRetour(id, text.trim())
          if (!updated) {
            setError(true)
            return
          }
          setStep(2)
          return
        case 2:
          setClosed(true)
          return
        default:
          return
      }
    } finally {
      setSending(false)
    }
  }

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
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={() => setClosed(true)} title={t('close')}>
          <CloseIcon />
        </button>
        {step === 0 && (
          <>
            <p className={styles.question}>{t('question')}</p>
            <div className={styles.input}>
              <ScoreInput selected={selected} setSelected={setSelected} />
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <p className={styles.question}>{t('amelioration')}</p>
            <div className={styles.input}>
              <TextArea
                id='nps-improvement'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t('ameliorationPlaceholder')}
                rows={2}
              />
            </div>
          </>
        )}
        {step === 2 && (
          <div className={styles.thanks}>
            <p className={styles.question}>{t('thanksTitle')}</p>
            <p className={styles.subtitle}>{t('thanks')}</p>
          </div>
        )}
        {error && (
          <div className={styles.errorAlert} role='alert' aria-live='polite'>
            {t('error')}
          </div>
        )}
        <div className={styles.buttonContainer}>
          <Button className={styles.button} onClick={send} disabled={sending}>
            {step === 2 ? t('close') : t('send')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NPS
