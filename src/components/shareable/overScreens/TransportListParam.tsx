import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { deplacements } from 'data/categories/deplacement'
import { getName } from 'utils/Equivalent/equivalent'
import EquivalentIcon from 'components/base/EquivalentIcon'
import CheckboxInput from 'components/form/CheckboxInput'
import customStyles from './CustomParam.module.css'
import styles from './TransportListParam.module.css'

const TransportListParam = () => {
  const t = useTranslations('overscreen.transport')
  const {
    language,
    transport: { modes, setModes },
  } = useParamContext()
  return (
    <div>
      <div className={customStyles.title}>{t('modes')}</div>
      <div className={styles.modes}>
        {deplacements
          .sort((a, b) => a.slug.localeCompare(b.slug))
          .map((transport) => (
            <CheckboxInput
              reversed
              className={classNames(styles.mode, { [styles.active]: modes.includes(transport.slug) })}
              labelClassName={styles.modeLabel}
              key={transport.slug}
              checked={modes.includes(transport.slug)}
              setChecked={(checked) =>
                setModes(checked ? [...modes, transport.slug] : modes.filter((mode) => mode !== transport.slug))
              }
              label={
                <div className={styles.left}>
                  <EquivalentIcon equivalent={{ ...transport, carpool: 0 }} height={2.5} />
                  <div className={styles.name}>{getName(language, { ...transport, carpool: 0 })}</div>
                </div>
              }
            />
          ))}
      </div>
    </div>
  )
}

export default TransportListParam
