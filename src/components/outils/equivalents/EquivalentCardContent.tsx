'use client'

import { useTranslations } from 'next-intl'
import { useGlobalStore } from 'src/providers/stores/global'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import { getNumberPrecision } from 'utils/formatNumberPrecision'
import EquivalentIcon from 'components/base/EquivalentIcon'
import LocalNumber from 'components/base/LocalNumber'
import styles from './EquivalentCardContent.module.css'

const EquivalentCardContent = ({
  equivalent,
  category,
  output,
}: {
  equivalent: ComputedEquivalent
  category: Category
  output?: string
}) => {
  const { value, unit } = getNumberPrecision(
    equivalent.carpool ? equivalent.value / (equivalent.carpool + 1) : equivalent.value
  )
  const { language } = useGlobalStore()
  const t = useTranslations('unit')
  const unitLabel = equivalent.unit || category.unit
  const Result = output ? 'output' : 'div'
  return (
    <div className={styles.content}>
      <div>
        <p className={styles.title}>{getName(language, equivalent)}</p>
        <Result form={output}>
          <p className={styles.value}>
            <span className={styles.valueNumber}>
              <LocalNumber number={value} />
            </span>{' '}
            {unit} CO₂e
          </p>
        </Result>
        {unitLabel && (
          <p className={styles.unit}>
            {equivalent.unit && t(equivalent.unit).startsWith(t('avec')) ? '' : `${t('par')} `}
            {t(unitLabel)}
          </p>
        )}
      </div>
      <EquivalentIcon equivalent={equivalent} height={5} />
    </div>
  )
}

export default EquivalentCardContent
