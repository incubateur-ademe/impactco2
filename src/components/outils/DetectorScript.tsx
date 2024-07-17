'use client'

import React, { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import ClipboardBox from 'components/base/ClipboardBox'
import CustomParam, { CustomParamValue } from 'components/shareable/overScreens/CustomParam'
import styles from './DetectorScript.module.css'

const DetectorScript = () => {
  const { language, setLanguage, theme, setTheme } = useParamContext()
  const search = useMemo(() => `?theme=${theme}&language=${language}`, [language, theme])
  return (
    <>
      <div className={styles.clipboardTitle}>Comment l'utiliser ?</div>
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
      <ClipboardBox tracking='Detecteur carbone'>{`<script id="script-detecteur-impact-co2" src="https://impactco2.fr/scripts/detection.js" data-search="${search}"></script>`}</ClipboardBox>
    </>
  )
}

export default DetectorScript
