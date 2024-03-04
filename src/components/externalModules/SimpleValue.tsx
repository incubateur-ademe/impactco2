import React from 'react'
import { Language, SimpleEquivalent } from 'types/equivalent'
import values from 'data/shopify/values.json'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import Emoji from 'components/base/Emoji'
import { Icon } from 'components/osezchanger/icons'
import styles from './SimpleValue.module.css'

const equivalents = values as Record<string, SimpleEquivalent>

const SimpleValue = ({ value, comparison, language }: { value: number; comparison: string; language?: Language }) => {
  let equivalent: SimpleEquivalent
  if (comparison !== 'random' && equivalents[comparison]) {
    equivalent = equivalents[comparison]
  } else {
    const meaningfullEquivalents = Object.entries(equivalents).filter(([, ecv]) => value / ecv.value > 1)
    const categories = [...new Set(meaningfullEquivalents.map((equivalent) => equivalent[1].category))]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const categoryEquivalents = meaningfullEquivalents.filter((equivalent) => equivalent[1].category === randomCategory)
    const randomEquivalent = categoryEquivalents[Math.floor(Math.random() * categoryEquivalents.length)]
    equivalent = randomEquivalent[1]
  }

  const comparisonValue = value / equivalent.value
  const equivalentValue = Number.isFinite(comparisonValue) ? (
    formatNumber(comparisonValue).toLocaleString()
  ) : (
    <Icon iconId='infinity' />
  )

  return (
    <div className={styles.container}>
      <div className={styles.emoji}>
        <Emoji>{equivalent.emoji}</Emoji>
      </div>
      <div className={styles.text}>
        <div className={styles.equivalentValue} data-testid={`etiquette-${comparison}-value`}>
          {equivalentValue}
        </div>
        <div className={styles.label} data-testid={`etiquette-${comparison}-name`}>
          {formatName(language ? equivalent[language] : equivalent.fr, comparisonValue, false)}
        </div>
      </div>
    </div>
  )
}

export default SimpleValue
