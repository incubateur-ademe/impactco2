'use client'

import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { LivraisonMode } from 'components/outils/livraison/Type'
import NewClipboardBox from 'src/components/base/NewClipboardBox'
import CustomParam, { CustomParamValue } from './CustomParam'
import IntegrateFooter from './IntegrateFooter'
import LivraisonModeParam from './LivraisonModeParam'
import styles from './Integrate.module.css'
import shareStyles from './Share.module.css'

const allModes = Object.values(LivraisonMode)

const LivraisonEtiquetteIntegrate = () => {
  const tIntegrate = useTranslations('overscreen.integrate-modal')
  const t = useTranslations('overscreen.livraison')
  const allParams = useParamContext()

  const [theme, setTheme] = useState(allParams.theme)
  const [language, setLanguage] = useState(allParams.language)
  const [modes, setModes] = useState(allModes)
  const [format, setFormat] = useState('static')

  const search = useMemo(() => {
    let result = `theme=${theme}&language=${language}`
    if (modes.length !== allModes.length && modes.length !== 0) {
      result += `&modes=${modes.join(',')}`
    }
    return result
  }, [theme, language, modes])

  const tracking = 'Livraison Étiquette'

  return (
    <>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionId}>1</span>
        {tIntegrate('perso')}
      </h2>
      <form
        id='livraison-etiquette-integrate'
        className={styles.options}
        onSubmit={(event) => {
          event.preventDefault()
        }}>
        <fieldset>
          <legend className={styles.legend}>{t('modeList.description')}</legend>
          <LivraisonModeParam modes={modes} setModes={setModes} />
        </fieldset>
        <div className={shareStyles.separator} />
        <CustomParam
          tracking={tracking}
          slug='etiquette'
          param={{ value: format, setter: setFormat } as CustomParamValue}
          visible
        />
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
      </form>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionId}>2</span>
        {tIntegrate('copy')}
      </h2>
      <NewClipboardBox
        form='livraison-etiquette-integrate'
        path={`livraison/etiquette${format === 'animated' ? '-animee' : ''}`}
        urlParams={search}
        tracking={tracking}>
        {`<script data-name="impact-co2" src="${process.env.NEXT_PUBLIC_URL}/iframe.js" data-type="livraison/etiquette${format === 'animated' ? '-animee' : ''}" data-search="?${search}"></script>`}
      </NewClipboardBox>
      <div className={shareStyles.separator} />
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionId}>3</span>
        {tIntegrate('paste')}
      </h2>
      <IntegrateFooter
        url={`livraison?${search}`}
        tracking={tracking}
        from='Livraison Étiquette intégration'
        where={t('pasting')}
      />
    </>
  )
}

export default LivraisonEtiquetteIntegrate
