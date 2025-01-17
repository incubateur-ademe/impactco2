'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useDistanceStore } from 'src/providers/stores/distance'
import { useTransportStore } from 'src/providers/stores/transport'
import { Params } from 'src/providers/stores/useAllParams'
import { track } from 'utils/matomo'
import useTransportations from 'hooks/useTransportations'
import NumberInput from 'components/form/NumberInput'
import CategorySimulator from './CategorySimulator'
import styles from './Simulator.module.css'
import TransportComparisonMode from './TransportComparisonMode'
import TransportComparisonSimulator from './TransportComparisonSimulator'

const DistanceSimulator = ({
  withComparisonMode,
  defaultParams,
}: {
  withComparisonMode: boolean
  defaultParams: Params['distance']
}) => {
  console.log(defaultParams)
  const [internalDistance, setInternalDistance] = useState(defaultParams.km)
  const { setKm, displayAll, setDisplayAll } = useDistanceStore()
  const { comparisonMode } = useTransportStore()

  useEffect(() => {
    setKm(internalDistance)
  }, [internalDistance])

  const t = useTranslations('transport.distance')
  const { hasMore, equivalents } = useTransportations('Transport distance', 'distance')

  return (
    <>
      <div className={styles.distanceSimulator}>
        <NumberInput
          id='km-value'
          value={internalDistance}
          setValue={(value) => {
            track('Transport distance', 'Distance', value.toString())
            setInternalDistance(value)
          }}
          label='Distance parcourue (en km)'
          unit='km'
        />
        <p>{t('header')}</p>
      </div>
      {withComparisonMode && <TransportComparisonMode tracking='Transport distance' />}
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
        <TransportComparisonSimulator tracking='Transport distance' equivalents={equivalents} />
      )}
    </>
  )
}

export default DistanceSimulator
