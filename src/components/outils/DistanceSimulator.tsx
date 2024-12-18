'use client'

import { useTranslations } from 'next-intl'
import { useDistanceStore } from 'src/providers/stores/distance'
import { useTransportStore } from 'src/providers/stores/transport'
import { track } from 'utils/matomo'
import useTransportations from 'hooks/useTransportations'
import NumberInput from 'components/form/NumberInput'
import CategorySimulator from './CategorySimulator'
import styles from './Simulator.module.css'
import TransportComparisonMode from './TransportComparisonMode'
import TransportComparisonSimulator from './TransportComparisonSimulator'

const DistanceSimulator = ({ withComparisonMode }: { withComparisonMode: boolean }) => {
  const { km, setKm, displayAll, setDisplayAll } = useDistanceStore()
  const { comparisonMode } = useTransportStore()

  const t = useTranslations('transport.distance')
  const { hasMore, equivalents } = useTransportations('Transport distance', 'distance')

  return (
    <>
      <div className={styles.distanceSimulator}>
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
