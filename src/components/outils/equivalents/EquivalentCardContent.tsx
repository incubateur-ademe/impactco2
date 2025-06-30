'use client'

import { useTranslations } from 'next-intl'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import CO2Quantity from 'components/base/CO2Quantity'
import EquivalentIcon from 'components/base/EquivalentIcon'
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
  const { language } = useParamContext()
  const t = useTranslations('unit')
  const unitLabel = equivalent.unit || category.unit
  const Result = output ? 'output' : 'div'
  return (
    <div className={styles.content}>
      <div>
        <p className={styles.title}>{getName(language, equivalent)}</p>
        <Result form={output}>
          <CO2Quantity
            quantity={equivalent.carpool ? equivalent.value / (equivalent.carpool + 1) : equivalent.value}
            className={styles.value}
            valueClassName={styles.valueNumber}
            language={language}
          />
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
