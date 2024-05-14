'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
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
    itineraire: { start, setStart, end, setEnd },
  } = useParamContext()

  const t = useTranslations('transport.itineraire')

  const { data: itineraries } = useItineraries(start, end, 'itinéraire')
  const equivalents = useTransportations('Transport itinéraire', 'itineraire', itineraries)
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
        Découvrez la quantité de CO₂e que vous émettez pour ce trajet
      </div>
      {start && end && itineraries ? (
        <>
          <div className={shareableStyles.separatorBothBorders} />
          <CategorySimulator equivalents={equivalents} />
        </>
      ) : (
        <div className={styles.empty}>
          <Image src='/images/tools-transport.svg' width={220} height={180} alt='' />
        </div>
      )}
    </>
  )
}

export default ItineraireSimulator