import React from 'react'
import values from 'data/shopify/values.json'
import formatName from 'utils/formatName'
import Emoji from 'components/base/Emoji'
import Equal from './Equal'
import styles from './Equivalent.module.css'
import Logo from './Logo'

const equivalents = values as Record<string, { label: string; value: number; emoji: string }>
const Equivalent = ({ baseValue, comparaison }: { baseValue: string; comparaison: string }) => {
  const intValue = Number.parseInt(baseValue)
  const value = Number.isNaN(intValue) ? 100000 : intValue

  let equivalent: { label: string; value: number; emoji: string }
  if (comparaison === 'random') {
    const meaningfullEquivalents = Object.entries(equivalents).filter(([, ecv]) => value / ecv.value > 1)
    const randomEquivalent = meaningfullEquivalents[Math.floor(Math.random() * meaningfullEquivalents.length)]
    equivalent = randomEquivalent[1]
  } else {
    equivalent = equivalents[comparaison]
  }

  const unit = value >= 1000 ? 'kg' : 'g'
  const unitValue = value >= 1000 ? value / 1000 : value
  const roundedValue = Math.round(unitValue * 100) / 100

  const equivalentValue = Math.round((value / equivalent.value) * 100) / 100

  return (
    <>
      <p className={styles.title}>
        La production de cet article émet{' '}
        <b>
          {roundedValue} {unit} CO<sub>2</sub>e
        </b>
      </p>
      <div className={styles.container}>
        <div className={styles.left}>
          <a href='https://impactco2.fr' className={styles.logo}>
            <Logo />
          </a>
          <div>
            <div className={styles.value}>{roundedValue}</div>
            <div className={styles.label}>
              {unit} CO<sub>2</sub>e
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.equal}>
            <Equal />
          </div>
          <div className={styles.emoji}>
            <Emoji>{equivalent.emoji}</Emoji>
          </div>
          <div>
            <div className={styles.equivalentValue}>{equivalentValue}</div>
            <div className={styles.label}>{formatName(equivalent.label, equivalentValue, false)}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Equivalent
