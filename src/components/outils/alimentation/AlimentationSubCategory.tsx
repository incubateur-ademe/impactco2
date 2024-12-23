import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { useGlobalStore } from 'src/providers/stores/global'
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
  barPosition,
  openCategories,
  toggleCategories,
}: {
  name: string
  logos?: string[]
  equivalents: ComputedEquivalent[]
  proportion: number
  barInfo?: string
  barPosition?: 'absolute' | 'relative'
  openCategories: Record<string, boolean>
  toggleCategories: (category: string) => void
}) => {
  const { language } = useGlobalStore()
  const t = useTranslations('alimentation')

  const display = useMemo(() => openCategories[name], [name, openCategories])
  const hasCategoryOpen = useMemo(() => Object.values(openCategories).some((open) => open), [openCategories])
  return (
    <div className={styles.box}>
      <button
        data-testid={`alimentation-category-${name}`}
        className={classNames(styles.button, { [styles.open]: display })}
        aria-expanded={display}
        aria-controls={`alimentation-category-${name}`}
        onClick={() => toggleCategories(name)}>
        <div className={styles.info}>
          <p>{t(name)}</p>
          <div className={styles.barContainer}>
            <div
              className={hasCategoryOpen ? styles.displayedBar : styles.bar}
              style={{ width: `${proportion * 100}%` }}
              aria-label={t('impact', { value: proportion * 100 })}
            />
            {barInfo && (
              <div className={barPosition === 'absolute' ? styles.barAbsoluteText : styles.barRelativeText}>
                {barInfo}
              </div>
            )}
          </div>
        </div>
        {display ? (
          <p className={styles.hide}>
            {t('hide')} <DropdownArrowUpIcon />
          </p>
        ) : (
          logos && (
            <div className={styles.icons}>
              {logos.map((logo) => {
                const equivalent = equivalents.find((equivalent) => equivalent.slug === logo)
                if (equivalent) {
                  return (
                    <div className={styles.icon} key={logo}>
                      <EquivalentIcon equivalent={equivalent} height={2} alt={getName(language, equivalent)} />
                    </div>
                  )
                }
              })}
              <p className={styles.iconText}>
                +{equivalents.length - logos.length}
                <span className={styles.more}>
                  {' '}
                  {t('more')}
                </span>
              </p>
            </div>
          )
        )}
      </button>
      <div id={`alimentation-category-${name}`}>
        {display && (
          <div className={styles.categories}>
            <CategorySimulator id={name} tracking='Alimentation' equivalents={equivalents} withSimulator reverse />
          </div>
        )}
      </div>
    </div>
  )
}

export default AlimentationSubCategory
