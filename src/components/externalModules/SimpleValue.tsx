'use client'

import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Language, SimpleEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import values from 'utils/Equivalent/values.json'
import formatNumber from 'utils/formatNumber'
import EquivalentIcon from 'components/base/EquivalentIcon'
import LocalNumber from 'components/base/LocalNumber'
import InfinityIcon from 'components/base/icons/infinity'
import styles from './SimpleValue.module.css'

const allEquivalents = values as Record<string, SimpleEquivalent>

export const getRandomEquivalent = (equivalents: [string, SimpleEquivalent][]) => {
  if (equivalents.length === 0) {
    return null
  }

  const categories = [...new Set(equivalents.map((equivalent) => equivalent[1].category))]
  const randomCategory = categories[Math.floor(Math.random() * categories.length)]
  const categoryEquivalents = equivalents.filter((equivalent) => equivalent[1].category === randomCategory)
  const randomEquivalent = categoryEquivalents[Math.floor(Math.random() * categoryEquivalents.length)]
  return { slug: randomEquivalent[0], equivalent: randomEquivalent[1] }
}

export const getValues = (comparison: string | null, value: number) => {
  if (comparison === null) {
    return null
  }

  const [slug, carpool] = comparison.split('+')
  if (comparison !== 'random' && allEquivalents[slug]) {
    const equivalent = allEquivalents[slug]
    return {
      equivalent: {
        ...allEquivalents[slug],
        carpool: carpool ? Number(carpool) : 0,
        value: carpool ? equivalent.value / (Number(carpool) + 1) : equivalent.value,
      },
      slug,
    }
  }
  const meaningfullEquivalents = Object.entries(allEquivalents).filter(
    ([, ecv]) => value / ecv.value >= 1 && value / ecv.value <= 99_999 && ecv.value > 0
  )
  if (meaningfullEquivalents.length === 0) {
    return null
  }
  return getRandomEquivalent(meaningfullEquivalents)
}

const SimpleValue = ({
  value,
  comparison,
  language,
  id,
}: {
  value: number
  comparison: string | null
  language: Language
  id?: string
}) => {
  const [values, setValues] = useState<{ equivalent: SimpleEquivalent; slug: string } | null>(
    comparison === 'random' ? null : getValues(comparison, value)
  )

  useEffect(() => {
    setValues(getValues(comparison, value))
  }, [comparison, value])

  if (!values) {
    return (
      <p className={classNames(styles.label, 'impactCO2-etiquette-text')}>
        {language === 'en'
          ? 'No equivalent available for this amount'
          : 'Aucun équivalent disponible pour cette quantité'}
      </p>
    )
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
      <p className={classNames(styles.text, 'impactCO2-etiquette-content')} id={id}>
        <span
          className={classNames(styles.equivalentValue, 'impactCO2-etiquette-value')}
          data-testid={`etiquette-${comparison}-value`}>
          {equivalentValue}
        </span>
        <span
          className={classNames(styles.label, 'impactCO2-etiquette-text')}
          data-testid={`etiquette-${comparison}-name`}>
          {getName(language, equivalent, true, comparisonValue, true, true)}
        </span>
      </p>
    </div>
  )
}

export default SimpleValue
