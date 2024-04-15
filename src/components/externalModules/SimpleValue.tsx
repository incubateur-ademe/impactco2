import classNames from 'classnames'
import React from 'react'
import { Language, SimpleEquivalent } from 'types/equivalent'
import values from 'data/shopify/values.json'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import EquivalentIcon from 'components/base/EquivalentIcon'
import { Icon } from 'components/osezchanger/icons'
import styles from './SimpleValue.module.css'

const equivalents = values as Record<string, SimpleEquivalent>

const SimpleValue = ({ value, comparison, language }: { value: number; comparison: string; language?: Language }) => {
  let equivalent: SimpleEquivalent
  let slug: string
  if (comparison !== 'random' && equivalents[comparison]) {
    equivalent = equivalents[comparison]
    slug = comparison
  } else {
    const meaningfullEquivalents = Object.entries(equivalents).filter(
      ([, ecv]) => value / ecv.value > 1 && ecv.value > 0
    )
    const categories = [...new Set(meaningfullEquivalents.map((equivalent) => equivalent[1].category))]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const categoryEquivalents = meaningfullEquivalents.filter((equivalent) => equivalent[1].category === randomCategory)
    const randomEquivalent = categoryEquivalents[Math.floor(Math.random() * categoryEquivalents.length)]
    slug = randomEquivalent[0]
    equivalent = randomEquivalent[1]
  }

  const comparisonValue = ((equivalent.percentage ? 100 : 1) * value) / equivalent.value
  const equivalentValue = Number.isFinite(comparisonValue) ? (
    formatNumber(comparisonValue).toLocaleString()
  ) : (
    <Icon iconId='infinity' />
  )

  return (
    <div className={styles.container}>
      <div className={styles.emoji}>
        <EquivalentIcon height={2} equivalent={{ ...equivalent, slug }} />
      </div>
      <div className={classNames(styles.text, 'impactCO2-etiquette-content')}>
        <div
          className={classNames(styles.equivalentValue, 'impactCO2-etiquette-value')}
          data-testid={`etiquette-${comparison}-value`}>
          {equivalentValue}
        </div>
        <div
          className={classNames(styles.label, 'impactCO2-etiquette-text')}
          data-testid={`etiquette-${comparison}-name`}>
          {formatName(language ? equivalent[language] : equivalent.fr, comparisonValue, false)}
        </div>
      </div>
    </div>
  )
}

export default SimpleValue
