import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import EquivalentIcon from 'components/base/EquivalentIcon'
import DropdownArrowUpIcon from 'components/base/icons/dropdown-arrow-up'
import CategorySimulator from '../CategorySimulator'
import styles from './AlimentationSubCategory.module.css'

const AlimentationSubCategory = ({
  name,
  equivalents,
  proportion,
}: {
  name: string
  equivalents: ComputedEquivalent[]
  proportion: number
}) => {
  const { language } = useParamContext()
  const t = useTranslations('alimentation')

  const [display, setDisplay] = useState(false)
  return (
    <div className={styles.box}>
      <button
        className={styles.button}
        aria-expanded={display}
        aria-controls={`alimentation-category-${name}`}
        onClick={() => setDisplay(!display)}>
        <div className={styles.info}>
          <p>{t(name)}</p>
          <div
            className={display ? styles.displayedBar : styles.bar}
            style={{ width: `${proportion * 100}%` }}
            aria-label={t('impact', { value: proportion * 100 })}
          />
        </div>
        {display ? (
          <p className={styles.hide}>
            {t('hide')} <DropdownArrowUpIcon />
          </p>
        ) : (
          <div className={styles.icons}>
            <div className={styles.icon}>
              <EquivalentIcon equivalent={equivalents[0]} height={2} alt={getName(language, equivalents[0])} />
            </div>
            <div className={styles.icon}>
              <EquivalentIcon equivalent={equivalents[1]} height={2} alt={getName(language, equivalents[1])} />
            </div>
            <div className={styles.icon}>{t('more', { count: equivalents.length - 2 })}</div>
          </div>
        )}
      </button>
      {display && (
        <div id={`alimentation-category-${name}`} className={styles.categories}>
          <CategorySimulator tracking='Alimentation' equivalents={equivalents} withSimulator />
        </div>
      )}
    </div>
  )
}

export default AlimentationSubCategory
