'use client'

import { useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import ClipboardBox from 'components/base/ClipboardBox'
import CustomParam, { CustomParamValue } from 'components/shareable/overScreens/CustomParam'
import IntegratePreview from 'components/shareable/overScreens/IntegratePreview'
import styles from './DetectorScript.module.css'

const DetectorScript = () => {
  const { language, setLanguage, theme, setTheme } = useParamContext()
  const [category, setCategory] = useState('all')
  const search = useMemo(
    () => `theme=${theme}&language=${language}${category === 'all' ? '' : `&category=${category}`}`,
    [language, theme, category]
  )
  return (
    <>
      <fieldset>
        <legend className={styles.title}>Intégrer le Détecteur</legend>
        <p className={styles.description}>
          Vous pouvez choisir les paramètres qui vous conviennent ci-dessous, puis copier/coller la balise HTML dans
          votre CMS pour intégrer le Détecteur dans vos contenus.
        </p>
        <CustomParam
          tracking={'Detecteur CO2'}
          slug='category'
          param={{ value: category, setter: setCategory } as CustomParamValue}
          visible
        />
        <div className={styles.separator} />
        <CustomParam
          tracking={'Detecteur CO2'}
          slug='theme'
          param={{ value: theme, setter: setTheme } as CustomParamValue}
          visible
        />
        <CustomParam
          tracking={'Detecteur CO2'}
          slug='language'
          param={{ value: language, setter: setLanguage } as CustomParamValue}
          visible
        />
      </fieldset>
      <ClipboardBox tracking='Detecteur carbone'>{`<script id="script-detecteur-impact-co2" src="https://impactco2.fr/scripts/detection.js" data-search="?${search}"></script>`}</ClipboardBox>
      <IntegratePreview path='detecteur' urlParams={search} />
    </>
  )
}

export default DetectorScript
