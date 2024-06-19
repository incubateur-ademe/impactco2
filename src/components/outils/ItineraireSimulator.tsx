'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import useItineraries from 'hooks/useItineraries'
import useTransportations from 'hooks/useTransportations'
import AddressInput from 'components/form/addresses/AddressInput'
import shareableStyles from '../shareable/Shareable.module.css'
import CategorySimulator from './CategorySimulator'
import styles from './ItineraireSimulator.module.css'

const ItineraireSimulator = () => {
  const {
    itineraire: { start, setStart, end, setEnd, displayAll, setDisplayAll },
  } = useParamContext()

  const t = useTranslations('transport.itineraire')
  const tTransport = useTranslations('transport')

  const { data: itineraries } = useItineraries(start, end, 'itinéraire')
  const { hasMore, equivalents } = useTransportations('Transport itinéraire', 'itineraire', itineraries)
  return (
    <>
      <div className={styles.simulator}>
        <div className={styles.addresses}>
          <AddressInput
            large
            id='itineraire-start'
            label={t('start')}
            required
            color='secondary'
            place={start?.address}
            setPlace={setStart}
          />
          <AddressInput
            large
            id='itineraire-end'
            label={t('end')}
            required
            color='secondary'
            place={end?.address}
            setPlace={setEnd}
          />
        </div>
        {t('header')}
      </div>
      {start && end && itineraries && (
        <>
          <div className={shareableStyles.separatorBothBorders} />
          <CategorySimulator
            tracking='Transport itinéraire'
            equivalents={equivalents}
            displayAll={displayAll}
            setDisplayAll={hasMore ? setDisplayAll : undefined}
            displayAllText={tTransport('displayAll')}
            hideAllText={tTransport('hideAll')}
            withSimulator
            type='itineraire'
          />
        </>
      )}
    </>
  )
}

export default ItineraireSimulator
