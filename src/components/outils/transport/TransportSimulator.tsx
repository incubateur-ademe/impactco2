'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { usePathname, useSearchParams } from 'next/navigation'
import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import useTrackingContext from 'src/providers/TrackingProvider'
import { track } from 'utils/matomo'
import DistanceSimulator from './DistanceSimulator'
import ItineraireSimulator from './ItineraireSimulator'
import styles from './TransportSimulator.module.css'

const distance = {
  label: 'Distance',
  value: 'distance',
}
const itineraire = {
  label: 'Itinéraire',
  value: 'itineraire',
}

const TransportSimulator = () => {
  const {
    setHideActions,
    transport: { selected, setSelected },
    itineraire: { start, end },
  } = useParamContext()

  const { trackOnce } = useTrackingContext()
  const distanceRef = useRef<HTMLButtonElement>(null)
  const itineraireRef = useRef<HTMLButtonElement>(null)
  const [forceFocus, setForceFocus] = useState(false)

  const t = useTranslations('transport.mode-selector')
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const mode = useMemo(() => searchParams.get('mode'), [searchParams])

  useEffect(() => {
    if (selected === 'distance') {
      setHideActions('')
    } else {
      setHideActions(!start || !end ? 'transport' : '')
    }
  }, [selected, start, end])

  useEffect(() => {
    if (pathName.includes(itineraire.value)) {
      setSelected('itineraire')
    } else {
      const tabsParam = searchParams.get('tabs')
      const values = tabsParam?.split(',')

      if (values && values.includes(itineraire.value)) {
        setSelected('itineraire')
      }
    }
  }, [pathName, setSelected, searchParams])

  const tabs = useMemo(() => {
    const tabsParam = searchParams.get('tabs')
    if (!tabsParam) {
      return true
    }
    const values = tabsParam.split(',')
    if (values.length === 0) {
      return true
    }

    if (values.includes(distance.value) && (values.includes(itineraire.value) || pathName.includes(itineraire.value))) {
      return true
    }

    return false
  }, [pathName, searchParams])

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.code === 'ArrowRight') {
        e.preventDefault()
        setSelected('itineraire')
        itineraireRef.current?.focus()
        setForceFocus(true)
      }
      if (e.code === 'ArrowLeft') {
        e.preventDefault()
        setSelected('distance')
        distanceRef.current?.focus()
        setForceFocus(true)
      }
    },
    [distanceRef, itineraireRef]
  )

  return (
    <>
      {tabs && (
        <div className={styles.tabs} data-testid='transport-tabs' role='tablist'>
          <button
            ref={distanceRef}
            className={classNames(styles.tab, {
              [styles.selectedTab]: selected === 'distance',
              [styles.forceFocus]: forceFocus,
            })}
            onClick={() => {
              track(
                selected === 'distance' ? 'Transport distance' : 'Transport itinéraire',
                'Onglet transport',
                'Distance'
              )
              trackOnce('Onglet transport Distance')
              setSelected('distance')
            }}
            data-testid='transport-tab-distance'
            role='tab'
            id='tab-distance'
            aria-controls='tabpanel-distance'
            aria-selected={selected === 'distance'}
            tabIndex={selected === 'distance' ? 0 : -1}
            onKeyDown={onKeyDown}
            onBlur={() => {
              if (selected === 'distance') {
                setForceFocus(false)
              }
            }}>
            {t('distance')}
          </button>
          <button
            ref={itineraireRef}
            className={classNames(styles.tab, {
              [styles.selectedTab]: selected === 'itineraire',
              [styles.forceFocus]: forceFocus,
            })}
            onClick={() => {
              track(
                selected === 'distance' ? 'Transport distance' : 'Transport itinéraire',
                'Onglet transport',
                'Itinéraire'
              )
              trackOnce('Onglet transport Itinéraire')
              setSelected('itineraire')
            }}
            data-testid='transport-tab-itineraire'
            role='tab'
            id='tab-itineraire'
            aria-controls='tabpanel-itineraire'
            aria-selected={selected === 'itineraire'}
            tabIndex={selected === 'itineraire' ? 0 : -1}
            onKeyDown={onKeyDown}
            onBlur={() => {
              if (selected === 'itineraire') {
                setForceFocus(false)
              }
            }}>
            {t('itineraire')}
          </button>
        </div>
      )}
      <div
        id='tabpanel-distance'
        role='tabpanel'
        aria-labelledby='tab-distance'
        className={selected === 'itineraire' ? styles.hidden : undefined}>
        <DistanceSimulator withComparisonMode={!mode} />
      </div>
      <div
        id='tabpanel-itineraire'
        role='tabpanel'
        aria-labelledby='tab-itineraire'
        className={selected === 'distance' ? styles.hidden : undefined}>
        <ItineraireSimulator withComparisonMode={!mode} />
      </div>
    </>
  )
}

export default TransportSimulator
