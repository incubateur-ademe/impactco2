'use client'

import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import NewClipboardBox from 'src/components/base/NewClipboardBox'
import CustomParam from './CustomParam'
import { CustomParamValue } from './CustomParam'
import EtiquetteEquivalent from './EtiquetteEquivalent'
import IntegrateFooter from './IntegrateFooter'
import styles from './Integrate.module.css'
import shareStyles from './Share.module.css'

const EtiquetteIntegrate = ({
  equivalents,
  setEquivalents,
}: {
  equivalents: string[]
  setEquivalents: (equivalents: string[]) => void
}) => {
  const tIntegrate = useTranslations('overscreen.integrate-modal')
  const t = useTranslations('overscreen.etiquette')
  const allParams = useParamContext()

  const [theme, setTheme] = useState(allParams.theme)
  const [language, setLanguage] = useState(allParams.language)

  const [weight, setWeight] = useState(allParams.comparateur.baseValue)
  const [format, setFormat] = useState('static')

  const search = useMemo(
    () =>
      `value=${weight}&language=${language}&theme=${theme}${equivalents.length > 0 ? `&comparisons=${equivalents.join(',')}` : ''}`,
    [weight, theme, equivalents, language]
  )

  const tracking = 'Étiquette'
  return (
    <>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionId}>1</span>
        {tIntegrate('perso')}
      </h2>
      <form
        id='etiquettes-integrate'
        className={styles.options}
        onSubmit={(event) => {
          event.preventDefault()
        }}>
        <CustomParam
          integration
          slug='weight'
          tracking={tracking}
          param={{ value: weight, setter: setWeight } as CustomParamValue}
          visible
        />
        <div className={shareStyles.separator} />
        <EtiquetteEquivalent equivalents={equivalents} setEquivalents={setEquivalents} />
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
        form='etiquettes-integrate'
        path={`comparateur/etiquette${format === 'animated' ? '-animee' : ''}`}
        urlParams={search}
        tracking={tracking}>
        {`<script data-name="impact-co2" src="${process.env.NEXT_PUBLIC_URL}/iframe.js" data-type="comparateur/etiquette${format === 'animated' ? '-animee' : ''}" data-search="?${search}"></script>`}
      </NewClipboardBox>
      <div className={shareStyles.separator} />
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionId}>3</span>
        {tIntegrate('paste')}
      </h2>
      <IntegrateFooter
        url={`etiquettes?${search}`}
        tracking={tracking}
        from='Étiquette intégration'
        where={t('pasting')}
      />
    </>
  )
}

export default EtiquetteIntegrate
