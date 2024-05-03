'use client'

import React from 'react'
import useTransportations from 'hooks/useTransportations'
import useParamContext from 'components/providers/ParamProvider'
import NumberInput from 'components/form/NumberInput'
import shareableStyles from '../shareable/Shareable.module.css'
import CategorySimulator from './CategorySimulator'
import styles from './Simulator.module.css'

const DistanceSimulator = () => {
  const {
    distance: { km, setKm },
  } = useParamContext()

  const equivalents = useTransportations('Transport distance', 'distance')

  return (
    <>
      <div className={styles.simulator}>
        <NumberInput id='km-value' value={km} setValue={setKm} label='Distance parcourue (en km)' unit='km' />
        Découvrez la quantité de CO2e que vous émettez pour cette distance
      </div>
      <div className={shareableStyles.separatorBothBorders} />
      <CategorySimulator equivalents={equivalents} />
    </>
  )
}

export default DistanceSimulator
