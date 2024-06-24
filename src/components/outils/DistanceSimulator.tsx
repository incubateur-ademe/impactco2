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
  const tTransport = useTranslations('transport')
  const t = useTranslations('transport.distance')

  const { hasMore, equivalents } = useTransportations('Transport distance', 'distance')

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
        {t('header')}
      </div>
      <div className={shareableStyles.separatorBothBorders} />
      <CategorySimulator
        tracking='Transport distance'
        equivalents={equivalents}
        displayAll={displayAll}
        setDisplayAll={hasMore ? setDisplayAll : undefined}
        displayAllText={tTransport('displayAll')}
        hideAllText={tTransport('hideAll')}
        withSimulator
        type='distance'
      />
    </>
  )
}

export default DistanceSimulator
