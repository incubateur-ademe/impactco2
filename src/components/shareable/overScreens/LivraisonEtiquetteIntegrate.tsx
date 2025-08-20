'use client'

import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { LivraisonMode } from 'components/outils/livraison/Type'
import ClipboardBox from 'components/base/ClipboardBox'
import CustomParam, { CustomParamValue } from './CustomParam'
import IntegratePreview from './IntegratePreview'
import LivraisonModeParam from './LivraisonModeParam'
import styles from './CustomParam.module.css'
import shareStyles from './Share.module.css'

const allModes = Object.values(LivraisonMode)

const LivraisonEtiquetteIntegrate = ({ animated }: { animated?: boolean }) => {
  const t = useTranslations('overscreen')
  const { theme, language, setTheme, setLanguage } = useParamContext()

  const [modes, setModes] = useState(allModes)

  const search = useMemo(() => {
    const result = `&theme=${theme}&language=${language}`
    const modeParams = modes.length === allModes.length || modes.length === 0 ? '' : `&modes=${modes.join(',')}`
    return `${result}${modeParams}`
  }, [theme, language, modes])

  return (
    <>
      <form id='livraison-integrate'>
        <fieldset>
          <legend className={styles.title}>{t('modeList.description')}</legend>
          <LivraisonModeParam modes={modes} setModes={setModes} />
        </fieldset>
        <div className={shareStyles.separator} />
        <CustomParam
          tracking='Livraison'
          slug='theme'
          param={{ value: theme, setter: setTheme } as CustomParamValue}
          visible
        />
        <CustomParam
          tracking='Livraison'
          slug='language'
          param={{ value: language, setter: setLanguage } as CustomParamValue}
          visible
        />
      </form>
      <ClipboardBox
        form='livraison-integrate'
        tracking='Livraison'>{`<script name="impact-co2" src="${process.env.NEXT_PUBLIC_URL}/iframe.js" data-type="/livraison/etiquette${animated ? '-animee' : ''} data-search="?${search}"></script>`}</ClipboardBox>
      <IntegratePreview path={`livraison/etiquette${animated ? '-animee' : ''}`} urlParams={search} />
    </>
  )
}

export default LivraisonEtiquetteIntegrate
