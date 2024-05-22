'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { track } from 'utils/matomo'
import useTransportations from 'hooks/useTransportations'
import NumberInput from 'components/form/NumberInput'
import shareableStyles from '../shareable/Shareable.module.css'
import CategorySimulator from './CategorySimulator'
import styles from './Simulator.module.css'

const DistanceSimulator = () => {
  const {
    distance: { km, setKm, displayAll, setDisplayAll },
  } = useParamContext()
  const t = useTranslations('transport')

  const equivalents = useTransportations('Transport distance', 'distance')

  return (
    <>
      <div className={styles.simulator}>
        <NumberInput
          id='km-value'
          value={km}
          setValue={(value) => {
            track('Transport distance', 'Distance', value.toString())
            setKm(value)
          }}
          label='Distance parcourue (en km)'
          unit='km'
        />
        Découvrez la quantité de CO₂e que vous émettez pour cette distance
      </div>
      <div className={shareableStyles.separatorBothBorders} />
      <CategorySimulator
        equivalents={equivalents}
        displayAll={displayAll}
        setDisplayAll={setDisplayAll}
        displayAllText={t('displayAll')}
        hideAllText={t('hideAll')}
        withSimulator
      />
    </>
  )
}

export default DistanceSimulator
