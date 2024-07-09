'use client'

import { useTranslations } from 'next-intl'
import React, { useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { deplacements } from 'data/categories/deplacement'
import ClipboardBox from 'components/base/ClipboardBox'
import DefaultButton from 'components/base/buttons/DefaultButton'
import Checkbox from 'components/form/Checkbox'
import CheckboxInput from 'components/form/CheckboxInput'
import CustomParam, { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import styles from './Share.module.css'
import TransportComparison from './TransportComparison'
import TransportListParam from './TransportListParam'
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
    transport: { selected, modes, comparisonMode },
  } = useParamContext()

  const [visibility, setVisibility] = useState<Record<string, boolean>>({
    km: true,
    itineraire: true,
  })

  const [defaultTab, setDefaultTab] = useState(selected)
  const [tabs, setTabs] = useState([DISTANCE, ITINERAIRE])

  const [comparisonModes, setComparisonModes] = useState(['list', 'comparison'])
  const [defaultMode, setDefaultMode] = useState(comparisonMode)

  const tracking = useMemo(() => getTracking(selected), [selected])

  const url = useMemo(() => {
    let result = `<script name="impact-co2" src="${process.env.NEXT_PUBLIC_URL}/iframe.js"`
    if (defaultTab === 'distance') {
      result += ` data-type="transport"`
    } else if (defaultTab === 'itineraire') {
      result += ` data-type="transport/itineraire"`
    }

    result += ` data-search="?theme=${theme}`
    result += `&language=${language}`

    if (tabs.length !== 2) {
      result += `&tabs=${tabs.join(',')}`
    }

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

    if (comparisonModes.length !== 2) {
      result += `&mode=${comparisonModes[0]}`
    } else {
      result += `&defaultMode=${defaultMode}`
    }

    if (modes.length !== 0 && modes.length !== deplacements.length) {
      result += `&modes=${modes.join(',')}`
    }

    return result + '"></script>'
  }, [
    defaultTab,
    visibility,
    tabs,
    distance.km,
    theme,
    itineraire.start,
    itineraire.end,
    language,
    modes,
    defaultMode,
    comparisonModes,
  ])

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
          data-testid='transport-integration-distance-checkbox'>
          <DefaultButton
            main={tabs.length === 1 ? tabs[0] === 'distance' : defaultTab === 'distance'}
            setMain={() => setDefaultTab('distance')}
            disabled={tabs.length === 1}
          />
        </CheckboxInput>
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
          label={tTransport('itineraire')}>
          <DefaultButton
            main={tabs.length === 1 ? tabs[0] === 'itineraire' : defaultTab === 'itineraire'}
            setMain={() => setDefaultTab('itineraire')}
            disabled={tabs.length === 1}
          />
        </CheckboxInput>
      </Checkbox>
      <div className={styles.separator} />
      {tabs.length === 0 ||
        (tabs.includes(DISTANCE) && (
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
        ))}
      {tabs.length === 0 ||
        (tabs.includes(ITINERAIRE) && (
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
        ))}
      <Checkbox required id='comparisonModes' label={t('mode-integrate')}>
        <CheckboxInput
          color='secondary'
          checked={comparisonModes.includes('list')}
          setChecked={(checked) => {
            if (checked) {
              setComparisonModes([...comparisonModes, 'list'])
            } else {
              setComparisonModes(comparisonModes.filter((tab) => tab !== 'list'))
            }
          }}
          label={tTransport('list')}
          data-testid='transport-integration-list-checkbox'>
          <DefaultButton
            main={comparisonModes.length === 1 ? comparisonModes[0] === 'list' : defaultMode === 'list'}
            setMain={() => setDefaultMode('list')}
            disabled={comparisonModes.length === 1}
          />
        </CheckboxInput>
        <CheckboxInput
          color='secondary'
          checked={comparisonModes.includes('comparison')}
          setChecked={(checked) => {
            if (checked) {
              setComparisonModes([...comparisonModes, 'comparison'])
            } else {
              setComparisonModes(comparisonModes.filter((tab) => tab !== 'comparison'))
            }
          }}
          label={tTransport('comparison')}>
          <DefaultButton
            main={comparisonModes.length === 1 ? comparisonModes[0] === 'comparison' : defaultMode === 'comparison'}
            setMain={() => setDefaultMode('comparison')}
            disabled={comparisonModes.length === 1}
          />
        </CheckboxInput>
      </Checkbox>
      <div className={styles.separator} />
      <TransportListParam />
      <div className={styles.separator} />
      <TransportComparison />
      <div className={styles.separator} />
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
