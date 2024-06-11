'use client'

import classNames from 'classnames'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
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
    transport: { selected, setSelected },
  } = useParamContext()

  const pathName = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathName.includes(itineraire.value)) {
      setSelected('itineraire')
    }
  }, [pathName, setSelected])

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

  return (
    <>
      {tabs && (
        <div className={styles.tabs} data-testid='transport-tabs'>
          <button
            className={classNames(styles.tab, { [styles.selectedTab]: selected === 'distance' })}
            onClick={() => setSelected('distance')}
            data-testid='transport-tab-distance'>
            Distance
          </button>
          <button
            className={classNames(styles.tab, { [styles.selectedTab]: selected === 'itineraire' })}
            onClick={() => setSelected('itineraire')}
            data-testid='transport-tab-itineraire'>
            Itinéraire
          </button>
        </div>
      )}
      {selected === 'distance' && <DistanceSimulator />}
      {selected === 'itineraire' && <ItineraireSimulator />}
    </>
  )
}

export default TransportSimulator
