'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { LivraisonMode, LivraisonType } from 'components/outils/livraison/Type'
import NewClipboardBox from 'src/components/base/NewClipboardBox'
import CustomParam, { CustomParamValue } from './CustomParam'
import IntegrateFooter from './IntegrateFooter'
import LivraisonModeParam from './LivraisonModeParam'
import LivraisonTypeParam from './LivraisonTypeParam'
import styles from './Integrate.module.css'
import shareStyles from './Share.module.css'

const allTypes = Object.values(LivraisonType)
const allModes = Object.values(LivraisonMode)

const LivraisonIntegrate = () => {
  const tIntegrate = useTranslations('overscreen.integrate-modal')
  const t = useTranslations('overscreen')
  const allParams = useParamContext()

  const [theme, setTheme] = useState(allParams.theme)
  const [language, setLanguage] = useState(allParams.language)
  const [showButtons, setShowButtons] = useState(true)
  const [withFabrication, setWithFabrication] = useState(allParams.livraison.withFabrication)

  const [types, setTypes] = useState(allTypes)
  const [modes, setModes] = useState(allModes)

  useEffect(() => {
    setWithFabrication(allParams.livraison.withFabrication)
  }, [allParams.livraison.withFabrication])

  const search = useMemo(() => {
    let result = `theme=${theme}&language=${language}`
    if (withFabrication) {
      result = `withFabrication=true&${result}`
    }
    if (!showButtons) {
      result += '&hideButtons=true'
    }
    if (types.length !== allTypes.length && types.length !== 0) {
      result += `&types=${types.join(',')}`
    }
    if (modes.length !== allModes.length && modes.length !== 0) {
      result += `&modes=${modes.join(',')}`
    }
    return result
  }, [withFabrication, showButtons, theme, language, types, modes])

  const tracking = 'Livraison Simulateur'

  return (
    <>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionId}>1</span>
        {tIntegrate('perso')}
      </h2>
      <form
        id='livraison-integrate'
        className={styles.options}
        onSubmit={(event) => {
          event.preventDefault()
        }}>
        <fieldset>
          <legend className={styles.legend}>{t('withFabrication.description')}</legend>
          <CustomParam
            tracking={tracking}
            slug='withFabrication'
            integration
            visible
            param={{ value: withFabrication, setter: setWithFabrication } as CustomParamValue}
          />
        </fieldset>
        <div className={shareStyles.separator} />
        <fieldset>
          <legend className={styles.legend}>{t('livraison.modeList.description')}</legend>
          <LivraisonModeParam modes={modes} setModes={setModes} />
        </fieldset>
        <div className={shareStyles.separator} />
        <fieldset>
          <legend className={styles.legend}>{t('livraison.typeList.description')}</legend>
          <LivraisonTypeParam types={types} setTypes={setTypes} />
        </fieldset>
        <div className={shareStyles.separator} />
        <fieldset>
          <legend className={styles.legend}>{t('hideButtons.description')}</legend>
          <CustomParam
            tracking={tracking}
            slug='hideButtons'
            integration
            visible
            param={{ value: showButtons, setter: setShowButtons } as CustomParamValue}
          />
        </fieldset>
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
      <NewClipboardBox form='livraison-integrate' path='livraison' urlParams={search} tracking={tracking}>
        {`<script data-name="impact-co2" src="${process.env.NEXT_PUBLIC_URL}/iframe.js" data-type="/livraison" data-search="?${search}"></script>`}
      </NewClipboardBox>
      <div className={shareStyles.separator} />
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionId}>3</span>
        {tIntegrate('paste')}
      </h2>
      <IntegrateFooter
        url={`livraison?tab=simulateur&${search}`}
        tracking={tracking}
        from='Livraison Simulateur intégration'
        where={t('livraison.pasting')}
      />
    </>
  )
}

export default LivraisonIntegrate
