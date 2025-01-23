'use client'

import { useMemo } from 'react'
import { useGlobalStore } from 'src/providers/stores/global'
import { useThemeStore } from 'src/providers/stores/theme'
import ClipboardBox from 'components/base/ClipboardBox'
import CustomParam, { CustomParamValue } from 'components/shareable/overScreens/CustomParam'
import styles from './DetectorScript.module.css'

const DetectorScript = () => {
  const { theme, setTheme } = useThemeStore()
  const { language, setLanguage } = useGlobalStore()
  const search = useMemo(() => `?theme=${theme}&language=${language}`, [language, theme])
  return (
    <>
      <fieldset>
        <legend className={styles.clipboardTitle}>Comment l'utiliser ?</legend>
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
      <ClipboardBox tracking='Detecteur carbone'>{`<script id="script-detecteur-impact-co2" src="https://impactco2.fr/scripts/detection.js" data-search="${search}"></script>`}</ClipboardBox>
    </>
  )
}

export default DetectorScript
