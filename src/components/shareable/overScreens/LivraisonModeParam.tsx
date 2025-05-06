import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { SetStateAction } from 'preact/compat'
import { Dispatch } from 'react'
import { LivraisonMode } from 'components/outils/livraison/Type'
import CheckboxInput from 'components/form/CheckboxInput'
import styles from './TransportListParam.module.css'

const allModes = Object.values(LivraisonMode)

const LivraisonModeParam = ({
  modes,
  setModes,
}: {
  modes: LivraisonMode[]
  setModes: Dispatch<SetStateAction<LivraisonMode[]>>
}) => {
  const t = useTranslations('livraison')
  return (
    <ul className={styles.equivalents}>
      {allModes.map((mode) => (
        <li key={mode} className={styles.list}>
          <CheckboxInput
            id={`livraison-list-${mode}-checkbox`}
            reversed
            className={classNames(styles.mode, { [styles.active]: modes.includes(mode) })}
            labelClassName={styles.modeLabel}
            checked={modes.includes(mode)}
            setChecked={(checked) => setModes(checked ? [...modes, mode] : modes.filter((value) => value !== mode))}
            label={
              <span className={styles.left}>
                <span className={styles.name}>{t(mode)}</span>
              </span>
            }
          />
        </li>
      ))}
    </ul>
  )
}

export default LivraisonModeParam
