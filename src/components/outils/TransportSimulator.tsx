'use client'

import classNames from 'classnames'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import DistanceSimulator from './DistanceSimulator'
import ItineraireSimulator from './ItineraireSimulator'
import styles from './TransportSimulator.module.css'

const TransportSimulator = () => {
  const {
    transport: { selected, setSelected },
  } = useParamContext()

  return (
    <>
      <div className={styles.tabs}>
        <button
          className={classNames(styles.tab, { [styles.selectedTab]: selected === 'distance' })}
          onClick={() => setSelected('distance')}>
          Distance
        </button>
        <button
          className={classNames(styles.tab, { [styles.selectedTab]: selected === 'itineraire' })}
          onClick={() => setSelected('itineraire')}>
          Itinéraire
        </button>
      </div>
      {selected === 'distance' && <DistanceSimulator />}
      {selected === 'itineraire' && <ItineraireSimulator />}
    </>
  )
}

export default TransportSimulator
