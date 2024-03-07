import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { Language } from 'types/equivalent'
import Logo from '../Logo'
import SimpleValue from '../SimpleValue'
import styles from './ColumnEquivalent.module.css'
import Equal from './Equal'
import baseStyles from './Equivalent.module.css'

const ColumnEquivalent = ({
  baseValue,
  comparisons,
  language,
}: {
  baseValue: string
  comparisons: string[]
  language?: Language
}) => {
  const intValue = Number(baseValue)
  const value = Number.isNaN(intValue) ? 100000 : intValue

  const unit = value >= 1000 ? 'kg' : 'g'
  const unitValue = value >= 1000 ? value / 1000 : value
  const roundedValue = (Math.round(unitValue * 100) / 100).toLocaleString()

  return (
    <div className={styles.container}>
      <div className={baseStyles.top}>
        <div className={styles.leftContent}>
          <div className={baseStyles.value} data-testid='etiquette-value'>
            {roundedValue}
          </div>
          <div className={baseStyles.label}>
            {unit} CO<sub>2</sub>e
          </div>
        </div>
        <Logo value={value} right />
      </div>
      <div className={baseStyles.rightColumn}>
        <div className={baseStyles.equalColumn}>
          <Equal />
        </div>
        <div className={baseStyles.comparisonsColumn}>
          {comparisons.map((comparison) => (
            <div key={comparison} className={styles.comparison}>
              <SimpleValue value={value} comparison={comparison} language={language} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ColumnEquivalent
