'use client'

import { useTranslations } from 'next-intl'
import useParamContext from 'src/providers/ParamProvider'
import useTrackingContext from 'src/providers/TrackingProvider'
import useItineraries from 'hooks/useItineraries'
import useTransportations from 'hooks/useTransportations'
import Button from 'components/base/buttons/Button'
import CheckboxInput from 'components/form/CheckboxInput'
import AddressInput from 'components/form/addresses/AddressInput'
import CategorySimulator from './CategorySimulator'
import EmptyItineraire from './EmptyItineraire'
import TransportComparisonMode from './TransportComparisonMode'
import TransportComparisonSimulator from './TransportComparisonSimulator'
import styles from './ItineraireSimulator.module.css'

const tracking = 'Transport itinéraire'
const ItineraireSimulator = ({ withComparisonMode }: { withComparisonMode: boolean }) => {
  const { trackOnce } = useTrackingContext()

  const {
    setOverscreen,
    setFaqAnchor,
    transport: { comparisonMode },
    itineraire: { start, setStart, end, setEnd, displayAll, setDisplayAll, roundTrip, setRoundTrip },
  } = useParamContext()

  const t = useTranslations('transport.itineraire')

  const { data: itineraries } = useItineraries(start, end, 'itinéraire', trackOnce)
  const { hasMore, equivalents } = useTransportations('Transport itinéraire', 'itineraire', itineraries)

  return (
    <>
      <div className={styles.simulator}>
        <p>
          {t.rich('header', {
            co2e: (chunks) => (
              <Button
                asLink
                onClick={() => {
                  setFaqAnchor('CO2e')
                  setOverscreen('transport', 'faq')
                }}>
                {chunks}
              </Button>
            ),
            parpersonne: (chunks) => (
              <Button
                asLink
                onClick={() => {
                  setFaqAnchor('Taux de remplissage')
                  setOverscreen('transport', 'faq')
                }}>
                {chunks}
              </Button>
            ),
          })}
        </p>
        <div className={styles.addresses}>
          <AddressInput large id='itineraire-start' label={t('start')} place={start?.address} setPlace={setStart} />
          <AddressInput large id='itineraire-end' label={t('end')} place={end?.address} setPlace={setEnd} />
        </div>
        <div className={styles.roundTrip}>
          <CheckboxInput id='roundTrip' label={t('roundTrip')} checked={roundTrip} setChecked={setRoundTrip} />
        </div>
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
              withFaq
            />
          ) : (
            <TransportComparisonSimulator tracking={tracking} equivalents={equivalents} />
          )}
        </>
      ) : (
        !itineraries && <EmptyItineraire />
      )}
    </>
  )
}

export default ItineraireSimulator
