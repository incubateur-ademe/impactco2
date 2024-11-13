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
  barInfo,
  logos,
}: {
  name: string
  logos?: number[]
  equivalents: ComputedEquivalent[]
  proportion: number
  barInfo?: string
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
          {barInfo && <div className={styles.barText}>{barInfo}</div>}
        </div>
        {display ? (
          <p className={styles.hide}>
            {t('hide')} <DropdownArrowUpIcon />
          </p>
        ) : (
          logos && (
            <div className={styles.icons}>
              {logos.map((logo) => (
                <div className={styles.icon} key={logo}>
                  <EquivalentIcon
                    equivalent={equivalents[logo]}
                    height={2}
                    alt={getName(language, equivalents[logo])}
                  />
                </div>
              ))}
              <div className={styles.icon}>{t('more', { count: equivalents.length - logos.length })}</div>
            </div>
          )
        )}
      </button>
      {display && (
        <div id={`alimentation-category-${name}`} className={styles.categories}>
          <CategorySimulator tracking='Alimentation' equivalents={equivalents} withSimulator reverse />
        </div>
      )}
    </div>
  )
}

export default AlimentationSubCategory
