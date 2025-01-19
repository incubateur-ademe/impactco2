'use client'

import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import useItineraries from 'hooks/useItineraries'
import useTransportations from 'hooks/useTransportations'
import CheckboxInput from 'components/form/CheckboxInput'
import AddressInput from 'components/form/addresses/AddressInput'
import CategorySimulator from './CategorySimulator'
import EmptyItineraire from './EmptyItineraire'
import styles from './ItineraireSimulator.module.css'
import TransportComparisonMode from './TransportComparisonMode'
import TransportComparisonSimulator from './TransportComparisonSimulator'

const ItineraireSimulator = ({ withComparisonMode, bis }: { withComparisonMode: boolean; bis?: boolean }) => {
  const {
    transport: { comparisonMode },
    itineraire: { start, setStart, end, setEnd, displayAll, setDisplayAll, roundTrip, setRoundTrip },
  } = useParamContext()

  const tracking = useMemo(() => `Transport itinéraire${bis ? ' bis' : ''}`, [bis])

  const t = useTranslations('transport.itineraire')

  const { data: itineraries } = useItineraries(start, end, `itinéraire${bis ? ' bis' : ''}`)
  const { hasMore, equivalents } = useTransportations('Transport itinéraire', 'itineraire', itineraries)

  return (
    <>
      <div className={styles.simulator}>
        {bis && <p>{t('header')}</p>}
        <div className={styles.addresses}>
          <AddressInput
            large
            id='itineraire-start'
            label={t('start')}
            required
            place={start?.address}
            setPlace={setStart}
          />
          <AddressInput large id='itineraire-end' label={t('end')} required place={end?.address} setPlace={setEnd} />
        </div>
        <div className={styles.roundTrip}>
          <CheckboxInput id='roundTrip' label={t('roundTrip')} checked={roundTrip} setChecked={setRoundTrip} />
        </div>
        {!bis && <p>{t('header')}</p>}
      </div>
      {start && end && itineraries ? (
        <>
          {withComparisonMode && <TransportComparisonMode tracking={tracking} />}
          {comparisonMode === 'list' ? (
            <CategorySimulator
              tracking={tracking}
              equivalents={equivalents}
              displayAll={displayAll}
              setDisplayAll={hasMore ? setDisplayAll : undefined}
              moreText='transport'
              withSimulator
              type='itineraire'
            />
          ) : (
            <TransportComparisonSimulator tracking={tracking} equivalents={equivalents} />
          )}
        </>
      ) : (
        bis && !itineraries && <EmptyItineraire />
      )}
    </>
  )
}

export default ItineraireSimulator
