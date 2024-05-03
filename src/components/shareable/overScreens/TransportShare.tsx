'use client'

import { useTranslations } from 'next-intl'
import React, { useMemo, useState } from 'react'
import { TransportSimulateur } from 'types/transport'
import { buildCurrentUrlFor } from 'utils/urls'
import useParamContext from 'components/providers/ParamProvider'
import ClipboardBox from 'components/base/ClipboardBox'
import Radio from 'components/form/Radio'
import RadioInput from 'components/form/RadioInput'
import { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import styles from './Share.module.css'

export const getTracking = (selected: TransportSimulateur) =>
  selected === 'distance' ? 'Transport distance' : 'Transport itinéraire'

const TransportShare = () => {
  const t = useTranslations('overscreen.transport')
  const tTransport = useTranslations('transport.mode-selector')
  const {
    distance,
    itineraire,
    transport: { selected, setSelected },
  } = useParamContext()

  const [visibility, setVisibility] = useState<Record<string, boolean>>({
    km: true,
    itineraire: true,
  })

  const tracking = useMemo(() => getTracking(selected), [selected])

  const url = useMemo(() => {
    let result = buildCurrentUrlFor('transport')
    if (selected === 'distance') {
      result += `?`
    } else if (selected === 'itineraire') {
      result += `/itineraire?`
    }

    if (selected === 'distance' && visibility.km) {
      result += `km=${distance.km}`
    } else if (selected === 'itineraire' && visibility.itineraire) {
      if (itineraire.start) {
        result += `itineraireStart=${itineraire.start.address}&`
      }
      if (itineraire.end) {
        result += `itineraireEnd=${itineraire.end.address}`
      }
    }

    return result
  }, [visibility, selected, distance.km, itineraire.start, itineraire.end])

  const params = useMemo(() => {
    return {
      km: { value: distance.km, setter: distance.setKm } as CustomParamValue,
      itineraire: {
        start: { value: itineraire.start?.address || '', setter: itineraire.setStart },
        end: { value: itineraire.end?.address || '', setter: itineraire.setEnd },
      },
    }
  }, [distance.km, itineraire.start, itineraire.end])

  return selected ? (
    <>
      <Radio required id='tabs' label={t('onglet')} hint={t('onglet-hint')}>
        <RadioInput
          value='distance'
          selected={selected}
          setSelected={(value) => setSelected(value as TransportSimulateur)}
          label={tTransport('distance')}
        />
        <RadioInput
          value='itineraire'
          selected={selected}
          setSelected={(value) => setSelected(value as TransportSimulateur)}
          label={tTransport('itineraire')}
        />
      </Radio>
      <div className={styles.separator} />
      {selected === 'distance' && (
        <CustomParams
          integration
          title='Distance'
          tracking={tracking}
          trackingType='Intégrer'
          params={{ km: params.km }}
          visibility={visibility}
          setVisibility={setVisibility}
          withTheme
        />
      )}
      {selected === 'itineraire' && (
        <CustomParams
          integration
          title='Itinéraire'
          tracking={tracking}
          trackingType='Intégrer'
          params={{ itineraire: params.itineraire }}
          visibility={visibility}
          setVisibility={setVisibility}
        />
      )}
      <div className={styles.separator} />
      <ClipboardBox tracking={tracking}>{url}</ClipboardBox>
      <div className={styles.meta}>
        <img src='/meta/transport.png' width={728} height={382.2} alt='' />
        <div>
          <p>
            <b>Transport</b>
          </p>
          <p className='text-sm'>
            Quelle est l'empreinte carbone de vos déplacements ? Avec Impact CO₂ vous connaitrez votre impact sur le
            climat
          </p>
        </div>
      </div>
    </>
  ) : null
}

export default TransportShare
