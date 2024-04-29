'use client'

import React from 'react'
import useParamContext from 'components/providers/ParamProvider'
import NumberInput from 'components/form/NumberInput'
import shareableStyles from '../misc/shareable/Shareable.module.css'
import styles from './Simulator.module.css'

const TransportSimulator = () => {
  const {
    distance: { km, setKm },
  } = useParamContext()

  return (
    <>
      <div className={styles.simulator}>
        <NumberInput id='km-value' value={km} setValue={setKm} label='Surface (en m²)' unit='m²' />
        Découvrez la quantité de CO2e que vous émettez pour chauffer cette surface par an
      </div>
      <div className={shareableStyles.separatorBothBorders} />
    </>
  )
}

export default TransportSimulator
