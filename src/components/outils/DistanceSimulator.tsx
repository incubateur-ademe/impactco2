'use client'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { track } from 'utils/matomo'
import useTransportations from 'hooks/useTransportations'
import NumberInput from 'components/form/NumberInput'
import CategorySimulator from './CategorySimulator'
import styles from './Simulator.module.css'
import TransportComparisonMode from './TransportComparisonMode'
import TransportComparisonSimulator from './TransportComparisonSimulator'

const DistanceSimulator = () => {
  const {
    transport: { comparisonMode },
    distance: { km, setKm, displayAll, setDisplayAll },
  } = useParamContext()
  const t = useTranslations('transport.distance')
  const { hasMore, equivalents } = useTransportations('Transport distance', 'distance')

  const searchParams = useSearchParams()
  const mode = useMemo(() => searchParams.get('mode'), [searchParams])
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
      {!mode && <TransportComparisonMode />}
      {comparisonMode === 'list' ? (
        <CategorySimulator
          tracking='Transport distance'
          equivalents={equivalents}
          displayAll={displayAll}
          setDisplayAll={hasMore ? setDisplayAll : undefined}
          moreText='transport'
          withSimulator
          type='distance'
        />
      ) : (
        <TransportComparisonSimulator equivalents={equivalents} />
      )}
    </>
  )
}

export default DistanceSimulator
