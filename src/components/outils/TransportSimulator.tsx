'use client'

import classNames from 'classnames'
import React, { useState } from 'react'
import DistanceSimulator from './DistanceSimulator'
import styles from './TransportSimulator.module.css'

const TransportSimulator = () => {
  const [tab, setTab] = useState('distance')

  return (
    <>
      <div className={styles.tabs}>
        <button
          className={classNames(styles.tab, { [styles.selectedTab]: tab === 'distance' })}
          onClick={() => setTab('distance')}>
          Distance
        </button>
        <button
          className={classNames(styles.tab, { [styles.selectedTab]: tab === 'itineraire' })}
          onClick={() => setTab('itineraire')}>
          Itinéraire
        </button>
      </div>
      {tab === 'distance' && <DistanceSimulator />}
    </>
  )
}

export default TransportSimulator
