'use client'

import { useTranslations } from 'next-intl'
import useParamContext from 'src/providers/ParamProvider'
import useTrackingContext from 'src/providers/TrackingProvider'
import useTransportations from 'hooks/useTransportations'
import NumberInput from 'components/form/NumberInput'
import CategorySimulator from './CategorySimulator'
import TransportComparisonMode from './TransportComparisonMode'
import TransportComparisonSimulator from './TransportComparisonSimulator'
import styles from './Simulator.module.css'

const DistanceSimulator = ({ withComparisonMode }: { withComparisonMode: boolean }) => {
  const { trackOnce } = useTrackingContext()
  const {
    transport: { comparisonMode },
    distance: { km, setKm, displayAll, setDisplayAll },
  } = useParamContext()
  const t = useTranslations('transport.distance')
  const { hasMore, equivalents } = useTransportations('Transport distance', 'distance')

  return (
    <>
      <div className={styles.distanceSimulator}>
        <NumberInput
          id='km-value'
          value={km}
          setValue={(value) => {
            trackOnce('Distance')
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
