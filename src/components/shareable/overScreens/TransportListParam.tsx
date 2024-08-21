import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { SetStateAction } from 'preact/compat'
import React, { Dispatch } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { deplacements } from 'data/categories/deplacement'
import { getNameWithoutSuffix } from 'utils/Equivalent/equivalent'
import EquivalentIcon from 'components/base/EquivalentIcon'
import InformationFillIcon from 'components/base/icons/information-fill'
import CheckboxInput from 'components/form/CheckboxInput'
import customStyles from './CustomParam.module.css'
import styles from './TransportListParam.module.css'

const transports = deplacements
  .flatMap((transport) =>
    transport.withCarpool ? [{ ...transport, slug: `${transport.slug}+1`, carpool: 1 }, transport] : [transport]
  )
  .sort((a, b) => a.slug.localeCompare(b.slug))

const TransportListParam = ({ modes, setModes }: { modes: string[]; setModes: Dispatch<SetStateAction<string[]>> }) => {
  const t = useTranslations('overscreen.transport')
  const { language } = useParamContext()
  return (
    <>
      <div className={customStyles.title}>
        {t('modes')}
        {modes.length === 2 && (
          <div className={styles.subtitle}>
            <InformationFillIcon />
            {t('modes-hint')}
          </div>
        )}
      </div>
      <ul className={styles.modes}>
        {transports.map((transport) => (
          <li key={transport.slug} className={styles.list}>
            <CheckboxInput
              reversed
              className={classNames(styles.mode, {
                [styles.active]: modes.length !== 2 && modes.includes(transport.slug),
                [styles.disabled]: modes.length === 2 && modes.includes(transport.slug),
              })}
              disabled={modes.length === 2 && modes.includes(transport.slug)}
              labelClassName={styles.modeLabel}
              checked={modes.includes(transport.slug)}
              setChecked={(checked) =>
                setModes(checked ? [...modes, transport.slug] : modes.filter((mode) => mode !== transport.slug))
              }
              label={
                <div className={styles.left}>
                  <EquivalentIcon equivalent={transport} height={2.5} />
                  <div className={styles.name}>{getNameWithoutSuffix(language, transport)}</div>
                </div>
              }
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default TransportListParam
