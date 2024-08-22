'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import { getNumberPrecision } from 'utils/formatNumberPrecision'
import EquivalentIcon from 'components/base/EquivalentIcon'
import LocalNumber from 'components/base/LocalNumber'
import styles from './EquivalentCardContent.module.css'

const EquivalentCardContent = ({ equivalent, category }: { equivalent: ComputedEquivalent; category: Category }) => {
  const { value, unit } = getNumberPrecision(
    equivalent.carpool ? equivalent.value / (equivalent.carpool + 1) : equivalent.value
  )
  const { language } = useParamContext()
  const t = useTranslations('unit')
  const unitLabel = equivalent.unit || category.unit
  return (
    <div className={styles.content}>
      <div>
        <div className={styles.title}>{getName(language, equivalent)}</div>
        <div className={styles.value}>
          <div className={styles.valueNumber}>
            <LocalNumber number={value} />
          </div>{' '}
          {unit} CO₂e
        </div>
        {unitLabel && (
          <div className={styles.unit}>
            {equivalent.unit && t(equivalent.unit).startsWith(t('avec')) ? '' : `${t('par')} `}
            {t(unitLabel)}
          </div>
        )}
      </div>
      <EquivalentIcon equivalent={equivalent} height={5} />
    </div>
  )
}

export default EquivalentCardContent
