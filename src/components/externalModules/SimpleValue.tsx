'use client'

import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Language, SimpleEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import values from 'utils/Equivalent/values.json'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import EquivalentIcon from 'components/base/EquivalentIcon'
import LocalNumber from 'components/base/LocalNumber'
import InfinityIcon from 'components/base/icons/infinity'
import styles from './SimpleValue.module.css'

const equivalents = values as Record<string, SimpleEquivalent>

const getValues = (comparison: string, value: number) => {
  if (comparison !== 'random' && equivalents[comparison]) {
    return { equivalent: equivalents[comparison], slug: comparison }
  }
  const meaningfullEquivalents = Object.entries(equivalents).filter(([, ecv]) => value / ecv.value > 1 && ecv.value > 0)
  const categories = [...new Set(meaningfullEquivalents.map((equivalent) => equivalent[1].category))]
  const randomCategory = categories[Math.floor(Math.random() * categories.length)]
  const categoryEquivalents = meaningfullEquivalents.filter((equivalent) => equivalent[1].category === randomCategory)
  const randomEquivalent = categoryEquivalents[Math.floor(Math.random() * categoryEquivalents.length)]
  return { slug: randomEquivalent[0], equivalent: randomEquivalent[1] }
}

const SimpleValue = ({
  value,
  comparison,
  language,
  id,
}: {
  value: number
  comparison: string
  language?: Language
  id?: string
}) => {
  const [values, setValues] = useState<{ equivalent: SimpleEquivalent; slug: string } | undefined>(
    comparison === 'random' ? undefined : getValues(comparison, value)
  )

  useEffect(() => {
    setValues(getValues(comparison, value))
  }, [comparison, value])

  if (!values) {
    return null
  }

  const comparisonValue = ((values.equivalent.percentage ? 100 : 1) * value) / values.equivalent.value
  const equivalentValue = Number.isFinite(comparisonValue) ? (
    <LocalNumber number={formatNumber(comparisonValue)} />
  ) : (
    <InfinityIcon />
  )

  const equivalent = { ...values.equivalent, slug: values.slug }
  return (
    <div className={styles.container}>
      <div className={styles.emoji}>
        <EquivalentIcon height={3} equivalent={equivalent} />
      </div>
      <div className={classNames(styles.text, 'impactCO2-etiquette-content')} id={id}>
        <div
          className={classNames(styles.equivalentValue, 'impactCO2-etiquette-value')}
          data-testid={`etiquette-${comparison}-value`}>
          {equivalentValue}
        </div>
        <div
          className={classNames(styles.label, 'impactCO2-etiquette-text')}
          data-testid={`etiquette-${comparison}-name`}>
          {getName(language || 'fr', equivalent, true, comparisonValue)}
        </div>
      </div>
    </div>
  )
}

export default SimpleValue
