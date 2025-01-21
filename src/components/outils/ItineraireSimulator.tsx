'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import { useItineraireStore } from 'src/providers/stores/itineraire'
import { useTransportStore } from 'src/providers/stores/transport'
import { completeAddress } from 'utils/address'
import { DefaultParams } from 'utils/params'
import useItineraries from 'hooks/useItineraries'
import useTransportations from 'hooks/useTransportations'
import CheckboxInput from 'components/form/CheckboxInput'
import AddressInput from 'components/form/addresses/AddressInput'
import CategorySimulator from './CategorySimulator'
import EmptyItineraire from './EmptyItineraire'
import styles from './ItineraireSimulator.module.css'
import TransportComparisonMode from './TransportComparisonMode'
import TransportComparisonSimulator from './TransportComparisonSimulator'

const ItineraireSimulator = ({
  withComparisonMode,
  bis,
  defaultParams,
}: {
  withComparisonMode: boolean
  bis?: boolean
  defaultParams: DefaultParams['itineraire']
}) => {
  const { start, setStart, end, setEnd, displayAll, setDisplayAll, setRoundTrip } = useItineraireStore()
  const { comparisonMode } = useTransportStore()

  const [internalRoundTrip, setInternalRoundTrip] = useState(defaultParams.roundTrip)
  useEffect(() => {
    setRoundTrip(internalRoundTrip)
  }, [internalRoundTrip])

  useEffect(() => {
    if (defaultParams.start) {
      completeAddress(setStart, defaultParams.start)
    }
    if (defaultParams.end) {
      completeAddress(setEnd, defaultParams.end)
    }
  }, [defaultParams])

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
          <CheckboxInput
            id='roundTrip'
            label={t('roundTrip')}
            checked={internalRoundTrip}
            setChecked={setInternalRoundTrip}
          />
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
              bis={bis}
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
