'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { deplacements } from 'data/categories/deplacement'
import ClipboardBox from 'components/base/ClipboardBox'
import DefaultButton from 'components/base/buttons/DefaultButton'
import Checkbox from 'components/form/Checkbox'
import CheckboxInput from 'components/form/CheckboxInput'
import CustomParam, { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import IntegratePreview from './IntegratePreview'
import styles from './Share.module.css'
import TransportComparison from './TransportComparison'
import TransportListParam from './TransportListParam'
import { getTracking } from './TransportShare'

const DISTANCE = 'distance'
const ITINERAIRE = 'itineraire'

const TransportIntegrate = () => {
  const t = useTranslations('overscreen.transport')
  const tTransport = useTranslations('transport.mode-selector')
  const allParams = useParamContext()

  const [visibility, setVisibility] = useState<Record<string, boolean>>({
    km: true,
    itineraire: true,
  })

  const [theme, setTheme] = useState(allParams.theme)
  const [language, setLanguage] = useState(allParams.language)

  const [defaultTab, setDefaultTab] = useState(allParams.transport.selected)
  const [tabs, setTabs] = useState([DISTANCE, ITINERAIRE])

  const [comparisonModes, setComparisonModes] = useState(['list', 'comparison'])
  const [defaultMode, setDefaultMode] = useState(allParams.transport.comparisonMode)

  const [modes, setModes] = useState(allParams.transport.modes)
  const [comparison, setComparison] = useState(allParams.transport.comparison)

  const [km, setKm] = useState(allParams.distance.km)
  useEffect(() => {
    setKm(allParams.distance.km)
  }, [allParams.distance.km])

  const [roundTrip, setRoundTrip] = useState(allParams.itineraire.roundTrip)
  useEffect(() => {
    setRoundTrip(allParams.itineraire.roundTrip)
  }, [allParams.itineraire.roundTrip])

  const [start, setStart] = useState(allParams.itineraire.start)
  useEffect(() => {
    setStart(allParams.itineraire.start)
  }, [allParams.itineraire.start])
  const [end, setEnd] = useState(allParams.itineraire.end)
  useEffect(() => {
    setEnd(allParams.itineraire.end)
  }, [allParams.itineraire.end])

  const tracking = useMemo(() => getTracking(allParams.transport.selected), [allParams.transport.selected])
  const type = useMemo(() => {
    if (defaultTab === 'itineraire') {
      return 'transport/itineraire'
    }
    return 'transport'
  }, [defaultTab])

  const search = useMemo(() => {
    let result = `theme=${theme}&language=${language}`

    if (tabs.length !== 2) {
      result += `&tabs=${tabs.join(',')}`
    }

    if (tabs.includes(DISTANCE) && visibility.km) {
      result += `&km=${km}`
    }

    if (tabs.includes(ITINERAIRE) && visibility.itineraire) {
      if (start) {
        result += `&itineraireStart=${start.address}`
      }
      if (end) {
        result += `&itineraireEnd=${end.address}`
      }
    }

    if (comparisonModes.length !== 2) {
      result += `&mode=${comparisonModes[0]}`
    } else {
      result += `&defaultMode=${defaultMode}`
    }

    if (comparison[0] !== 'voiturethermique' || comparison[1] !== 'tgv') {
      result += `&comparison=${comparison[0]},${comparison[1]}`
    }

    if (
      modes.length !== 0 &&
      modes.length !== deplacements.reduce((acc, current) => acc + (current.withCarpool ? 2 : 1), 0)
    ) {
      result += `&modes=${modes.join(',')}`
    }

    if (roundTrip) {
      result += '&roundTrip=true'
    }

    return result
  }, [visibility, tabs, km, theme, start, end, language, modes, defaultMode, comparisonModes, comparison, roundTrip])

  const params = useMemo(() => {
    return {
      km: { value: km, setter: setKm } as CustomParamValue,
      itineraire: {
        start: { value: start?.address || '', setter: setStart },
        end: { value: end?.address || '', setter: setEnd },
      },
      roundTrip: { value: roundTrip, setter: setRoundTrip } as CustomParamValue,
    }
  }, [km, start, end, roundTrip])

  return (
    <>
      <form id='transport-integrate'>
        <Checkbox required id='tabs' label={t('onglets')} hint={t('onglets-hint')}>
          <CheckboxInput
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
            id='transport-integration-distance-checkbox'>
            <DefaultButton
              name='tab'
              main={tabs.length === 1 ? tabs[0] === 'distance' : defaultTab === 'distance'}
              setMain={() => setDefaultTab('distance')}
              disabled={tabs.length === 1}
            />
          </CheckboxInput>
          <CheckboxInput
            id='transport-integration-itineraire-checkbox'
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
              name='tab'
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
                params={{ itineraire: params.itineraire, roundTrip: params.roundTrip }}
                visibility={visibility}
                setVisibility={setVisibility}
              />
              <div className={styles.separator} />
            </>
          ))}
        <Checkbox required id='comparisonModes' label={t('mode-integrate')}>
          <CheckboxInput
            checked={comparisonModes.includes('list')}
            setChecked={(checked) => {
              if (checked) {
                setComparisonModes([...comparisonModes, 'list'])
              } else {
                setComparisonModes(comparisonModes.filter((tab) => tab !== 'list'))
              }
            }}
            label={tTransport('list')}
            data-testid='transport-integration-list-checkbox'
            id='transport-integration-list-checkbox'>
            <DefaultButton
              name='mode'
              main={comparisonModes.length === 1 ? comparisonModes[0] === 'list' : defaultMode === 'list'}
              setMain={() => setDefaultMode('list')}
              disabled={comparisonModes.length === 1}
            />
          </CheckboxInput>
          <CheckboxInput
            id='transport-integration-comparison-checkbox'
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
              name='mode'
              main={comparisonModes.length === 1 ? comparisonModes[0] === 'comparison' : defaultMode === 'comparison'}
              setMain={() => setDefaultMode('comparison')}
              disabled={comparisonModes.length === 1}
            />
          </CheckboxInput>
        </Checkbox>
        <div className={styles.separator} />
        <TransportListParam modes={modes} setModes={setModes} />
        <div className={styles.separator} />
        <TransportComparison comparison={comparison} setComparison={setComparison} modes={modes} />
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
      </form>
      <ClipboardBox
        form='transport-integrate'
        tracking={
          tracking
        }>{`<script name="impact-co2" src="${process.env.NEXT_PUBLIC_URL}/iframe.js" data-type="${type}" data-search="?${search}"></script>`}</ClipboardBox>
      <IntegratePreview path={type} urlParams={search} />
    </>
  )
}

export default TransportIntegrate
