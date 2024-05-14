import classNames from 'classnames'
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { Language } from 'types/equivalent'
import EqualIcon from 'components/base/icons/equal'
import RefreshIcon from 'components/base/icons/refresh'
import Logo from '../Logo'
import SimpleValue from '../SimpleValue'
import styles from './ColumnEquivalent.module.css'
import baseStyles from './Equivalent.module.css'

const ColumnEquivalent = ({
  baseValue,
  comparisons,
  language,
  randomize,
}: {
  baseValue: string | number
  comparisons: string[]
  language?: Language
  randomize?: () => void
}) => {
  const intValue = Number(baseValue)
  const value = Number.isNaN(intValue) ? 100000 : intValue

  const unit = value >= 1000 ? 'kg' : 'g'
  const unitValue = value >= 1000 ? value / 1000 : value
  const roundedValue = (Math.round(unitValue * 100) / 100).toLocaleString()

  return (
    <div className={classNames(styles.container, { [styles.withRandomize]: !!randomize })}>
      <div className={baseStyles.top}>
        <div className={styles.leftContent}>
          <div className={baseStyles.value} data-testid='etiquette-value'>
            {roundedValue}
          </div>
          <div className={baseStyles.label}>{unit} CO₂e</div>
        </div>
        <Logo value={value * 1000} right />
      </div>
      <div className={baseStyles.rightColumn}>
        <div className={baseStyles.equalColumn}>
          <EqualIcon />
        </div>
        <div className={baseStyles.comparisonsColumn}>
          {comparisons.map((comparison) => (
            <div key={comparison} className={styles.comparison}>
              <SimpleValue value={value} comparison={comparison} language={language} />
            </div>
          ))}
        </div>
      </div>
      {randomize && (
        <button className={baseStyles.columnRandomize} title='Obtenir une nouvelle comparaison' onClick={randomize}>
          <RefreshIcon />
        </button>
      )}
    </div>
  )
}

export default ColumnEquivalent
