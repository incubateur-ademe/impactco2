import React from 'react'
import values from 'data/shopify/values.json'
import formatName from 'utils/formatName'
import Emoji from 'components/base/Emoji'
import styles from './SimpleValue.module.css'

const equivalents = values as Record<string, { label: string; value: number; emoji: string; category: number }>

const SimpleValue = ({ value, comparison }: { value: number; comparison: string }) => {
  let equivalent: { label: string; value: number; emoji: string }
  if (comparison === 'random') {
    const meaningfullEquivalents = Object.entries(equivalents).filter(([, ecv]) => value / ecv.value > 1)
    const categories = [...new Set(meaningfullEquivalents.map((equivalent) => equivalent[1].category))]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const categoryEquivalents = meaningfullEquivalents.filter((equivalent) => equivalent[1].category === randomCategory)
    const randomEquivalent = categoryEquivalents[Math.floor(Math.random() * categoryEquivalents.length)]
    equivalent = randomEquivalent[1]
  } else {
    equivalent = equivalents[comparison]
  }

  const comparisonValue = value / equivalent.value
  const equivalentValue =
    comparisonValue > 100
      ? Math.round(comparisonValue)
      : comparisonValue > 10
        ? Math.round(comparisonValue * 10) / 10
        : Math.round(comparisonValue * 100) / 100

  return (
    <div className={styles.container}>
      <div className={styles.emoji}>
        <Emoji>{equivalent.emoji}</Emoji>
      </div>
      <div>
        <div className={styles.equivalentValue}>{equivalentValue.toLocaleString()}</div>
        <div className={styles.label}>{formatName(equivalent.label, equivalentValue, false)}</div>
      </div>
    </div>
  )
}

export default SimpleValue
