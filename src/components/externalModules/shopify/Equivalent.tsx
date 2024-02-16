import React, { ReactNode } from 'react'
import Logo from '../Logo'
import SimpleValue from '../SimpleValue'
import Equal from './Equal'
import styles from './Equivalent.module.css'

const Equivalent = ({
  className,
  baseValue,
  comparisons,
  title,
}: {
  className?: string
  baseValue: string
  comparisons: string[]
  title?: (unit: string, roundedValue: string, intValue: number) => ReactNode
}) => {
  const intValue = Number.parseInt(baseValue)
  const value = Number.isNaN(intValue) ? 100000 : intValue

  const unit = value >= 1000 ? 'kg' : 'g'
  const unitValue = value >= 1000 ? value / 1000 : value
  const roundedValue = (Math.round(unitValue * 100) / 100).toLocaleString()

  return (
    <div className={className}>
      {title && title(unit, roundedValue, intValue)}
      <div className={styles.container}>
        <div className={styles.left}>
          <Logo />
          <div>
            <div className={styles.value}>{roundedValue}</div>
            <div className={styles.label}>
              {unit} CO<sub>2</sub>e
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.equal}>
            <Equal />
          </div>
          <div className={styles.comparisons}>
            {comparisons.map((comparison) => (
              <div key={comparison} className={styles.comparison}>
                <SimpleValue value={value} comparison={comparison} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Equivalent
