'use client'

import { useTranslations } from 'next-intl'
import React, { useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import ClipboardBox from 'components/base/ClipboardBox'
import Checkbox from 'components/form/Checkbox'
import CheckboxInput from 'components/form/CheckboxInput'
import CustomParam, { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import styles from './Share.module.css'
import { getTracking } from './TransportShare'

const DISTANCE = 'distance'
const ITINERAIRE = 'itineraire'

const TransportIntegrate = () => {
  const t = useTranslations('overscreen.transport')
  const tTransport = useTranslations('transport.mode-selector')
  const {
    distance,
    itineraire,
    theme,
    setTheme,
    language,
    setLanguage,
    transport: { selected },
  } = useParamContext()

  const [visibility, setVisibility] = useState<Record<string, boolean>>({
    km: true,
    itineraire: true,
  })

  const [tabs, setTabs] = useState([DISTANCE, ITINERAIRE])

  const tracking = useMemo(() => getTracking(selected), [selected])

  const url = useMemo(() => {
    let result = `<script name="impact-co2" src="${process.env.NEXT_PUBLIC_URL}/iframe.js"`
    if (selected === 'distance') {
      result += ` data-type="transport"`
    } else if (selected === 'itineraire') {
      result += ` data-type="transport/itineraire"`
    }

    result += ` data-search="?theme=${theme}`

    result += `&tabs=${tabs.join(',')}`
    result += `&language=${language}`

    if (tabs.includes(DISTANCE) && visibility.km) {
      result += `&km=${distance.km}`
    }

    if (tabs.includes(ITINERAIRE) && visibility.itineraire) {
      if (itineraire.start) {
        result += `&itineraireStart=${itineraire.start.address}`
      }
      if (itineraire.end) {
        result += `&itineraireEnd=${itineraire.end.address}`
      }
    }

    return result + '"></script>'
  }, [selected, visibility, tabs, distance.km, theme, itineraire.start, itineraire.end, language])

  const params = useMemo(() => {
    return {
      km: { value: distance.km, setter: distance.setKm } as CustomParamValue,
      itineraire: {
        start: { value: itineraire.start?.address || '', setter: itineraire.setStart },
        end: { value: itineraire.end?.address || '', setter: itineraire.setEnd },
      },
    }
  }, [distance.km, itineraire.start, itineraire.end])

  return (
    <>
      <Checkbox required id='tabs' label={t('onglets')} hint={t('onglets-hint')}>
        <CheckboxInput
          color='secondary'
          checked={tabs.includes(DISTANCE)}
          setChecked={(checked) => {
            if (checked) {
              setTabs([...tabs, DISTANCE])
            } else {
              setTabs(tabs.filter((tab) => tab !== DISTANCE))
            }
          }}
          label={tTransport('distance')}
          data-testid='transport-integration-distance-checkbox'
        />
        <CheckboxInput
          color='secondary'
          checked={tabs.includes(ITINERAIRE)}
          setChecked={(checked) => {
            if (checked) {
              setTabs([...tabs, ITINERAIRE])
            } else {
              setTabs(tabs.filter((tab) => tab !== ITINERAIRE))
            }
          }}
          label={tTransport('itineraire')}
        />
      </Checkbox>
      <div className={styles.separator} />
      {tabs.includes(DISTANCE) && (
        <>
          <CustomParams
            integration
            title={tTransport('distance')}
            tracking={tracking}
            trackingType='Intégrer'
            params={{ km: params.km }}
            visibility={visibility}
            setVisibility={setVisibility}
          />
          <div className={styles.separator} />
        </>
      )}
      {tabs.includes(ITINERAIRE) && (
        <>
          <CustomParams
            integration
            title={tTransport('itineraire')}
            tracking={tracking}
            trackingType='Intégrer'
            params={{ itineraire: params.itineraire }}
            visibility={visibility}
            setVisibility={setVisibility}
          />
          <div className={styles.separator} />
        </>
      )}
      <CustomParam
        tracking={tracking}
        slug='theme'
        param={{ value: theme, setter: setTheme } as CustomParamValue}
        visible
      />
      <CustomParam
        tracking={tracking}
        slug='language'
        integration
        param={{ value: language, setter: setLanguage } as CustomParamValue}
        visible
      />
      <ClipboardBox tracking={tracking}>{url}</ClipboardBox>
    </>
  )
}

export default TransportIntegrate
