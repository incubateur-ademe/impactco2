'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { deplacements } from 'data/categories/deplacement'
import ClipboardBox from 'components/base/ClipboardBox'
import TransportClipboardBox from 'src/components/base/TransportClipboardBox'
import Link from 'src/components/base/buttons/Link'
import Radio from 'src/components/form/Radio'
import RadioInput from 'src/components/form/RadioInput'
import CustomParam, { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import TransportComparison from './TransportComparison'
import TransportIntegrateAdvanced from './TransportIntegrateAdvanced'
import TransportIntegratePaste from './TransportIntegratePaste'
import TransportListParam from './TransportListParam'
import { getTracking } from './TransportShare'
import shareStyles from './Share.module.css'
import styles from './TransportIntegrate.module.css'

const TransportIntegrate = () => {
  const t = useTranslations('overscreen.transport')
  const tTransport = useTranslations('transport.mode-selector')
  const allParams = useParamContext()

  const [theme, setTheme] = useState(allParams.theme)
  const [language, setLanguage] = useState(allParams.language)

  const [defaultTab, setDefaultTab] = useState(allParams.transport.selected)

  const [defaultMode, setDefaultMode] = useState(allParams.transport.comparisonMode)

  const [modes, setModes] = useState(allParams.transport.modes)
  const [comparison, setComparison] = useState(allParams.transport.comparison)

  const [km, setKm] = useState(allParams.distance.km)
  useEffect(() => {
    setKm(allParams.distance.km)
  }, [allParams.distance.km])

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
    result += `&km=${km}`
    if (end) {
      result += `&itineraireEnd=${encodeURIComponent(end.address)}`
    }
    result += `&defaultMode=${defaultMode}`

    if (comparison[0] !== 'voiturethermique' || comparison[1] !== 'tgv') {
      result += `&comparison=${comparison[0]},${comparison[1]}`
    }

    if (
      modes.length !== 0 &&
      modes.length !==
        deplacements
          .filter((deplacement) => !deplacement.ignore)
          .reduce((acc, current) => acc + (current.withCarpool ? 2 : 1), 0)
    ) {
      result += `&modes=${modes.join(',')}`
    }

    return result
  }, [km, theme, end, language, modes, defaultMode, comparison])

  const params = useMemo(() => {
    return {
      km: { value: km, setter: setKm } as CustomParamValue,
      itineraire: {
        end: { value: end?.address || '', setter: setEnd },
      },
    }
  }, [km, end])

  return (
    <>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionId}>1</span>
        {t('integrate-perso')}
      </h2>
      <form id='transport-integrate' className={styles.options}>
        <Radio id='tab' label={t('onglets')} hint={t('onglets-hint')}>
          <RadioInput
            value='distance'
            selected={defaultTab}
            setSelected={() => {
              setDefaultTab('distance')
            }}
            label={tTransport('distance')}
            data-testid='transport-integration-distance-checkbox'
            id='transport-integration-distance-checkbox'
          />
          <RadioInput
            id='transport-integration-itineraire-checkbox'
            value='itineraire'
            selected={defaultTab}
            setSelected={() => {
              setDefaultTab('itineraire')
            }}
            label={tTransport('itineraire')}
          />
        </Radio>
        <div className={shareStyles.separator} />
        <CustomParams
          integration
          title={tTransport('distance')}
          hint={tTransport('distance-hint')}
          tracking={tracking}
          trackingType='Intégrer'
          params={{ km: params.km }}
        />
        <div className={shareStyles.separator} />
        <CustomParams
          integration
          tracking={tracking}
          trackingType='Intégrer'
          params={{ itineraire: { end: params.itineraire.end } }}
        />
        <div className={shareStyles.separator} />
        <TransportListParam modes={modes} setModes={setModes} />
        <div className={shareStyles.separator} />
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
        <div className={shareStyles.separator} />
        <TransportIntegrateAdvanced>
          <Radio id='comparisonModes' label={t('mode-integrate')} hint={t('mode-integrate-hint')}>
            <RadioInput
              value='list'
              selected={defaultMode}
              setSelected={() => {
                setDefaultMode('list')
              }}
              label={tTransport('list')}
              data-testid='transport-integration-list-checkbox'
              id='transport-integration-list-checkbox'></RadioInput>
            <RadioInput
              value='comparison'
              id='transport-integration-comparison-checkbox'
              selected={defaultMode}
              setSelected={() => {
                setDefaultMode('comparison')
              }}
              label={tTransport('comparison')}></RadioInput>
          </Radio>
          <div className={shareStyles.separator} />
          <TransportComparison comparison={comparison} setComparison={setComparison} modes={modes} />
        </TransportIntegrateAdvanced>
      </form>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionId}>2</span>
        {t('integrate-copy')}
      </h2>
      <TransportClipboardBox form='transport-integrate' path={type} urlParams={search} tracking={tracking}>
        {`<script data-name="impact-co2" src="${process.env.NEXT_PUBLIC_URL}/iframe.js" data-type="${type}" data-search="?${search}"></script>`}
      </TransportClipboardBox>
      <div className={shareStyles.separator} />
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionId}>3</span>
        {t('integrate-paste')}
      </h2>
      <TransportIntegratePaste />
      <div className={shareStyles.separator} />
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionIdBis}>?</span>
        {t('integrate-difficulty')}
      </h2>
      <p className={styles.text}>
        {t.rich('integrate-difficulty-text', { link: (children) => <Link href='/doc/exemples'>{children}</Link> })}
      </p>
      <ClipboardBox tracking={`${tracking} aide`}>
        https://impactco2.fr/outils/transport?km=10&defaultMode=list&language=fr
      </ClipboardBox>
    </>
  )
}

export default TransportIntegrate
