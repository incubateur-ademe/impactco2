import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Language } from 'types/equivalent'
import { getNumberPrecision } from 'utils/formatNumberPrecision'
import LocalNumber from 'components/base/LocalNumber'
import EqualIcon from 'components/base/icons/equal'
import RefreshIcon from 'components/base/icons/refresh'
import Logo from '../Logo'
import SimpleValue from '../SimpleValue'
import Disclaimer from './Disclaimer'
import styles from './Equivalent.module.css'
import Progress from './Progress'

const Equivalent = ({
  className,
  baseValue,
  comparisons,
  title,
  animated,
  url,
  language,
  randomize,
}: {
  className?: string
  baseValue: string | number
  comparisons: string[]
  title?: (unit: string, roundedValue: number, intValue: number) => ReactNode
  animated?: boolean
  url?: string
  language: Language
  randomize?: () => void
}) => {
  const isAnimated = useMemo(() => animated && comparisons.length > 1, [animated, comparisons])

  const [toDisplay, setToDisplay] = useState(0)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    if (isAnimated) {
      setToDisplay(0)
      setFadeIn(false)
    }
  }, [isAnimated, comparisons])

  const intValue = Number(baseValue)
  const preciseValue = Number.isNaN(intValue) ? 100000 : intValue
  const { unit, value } = getNumberPrecision(preciseValue / 1000)

  return (
    <div className={className}>
      {title && title(unit, value, intValue)}
      <div className={styles.container}>
        <div className={styles.left}>
          <Logo value={preciseValue} url={url} />
          <div className={styles.leftContent}>
            <div className={styles.value} data-testid='etiquette-value'>
              <LocalNumber number={value} />
            </div>
            <div className={styles.label}>{unit} CO₂e</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={isAnimated ? styles.animatedEqual : styles.equal}>
            <EqualIcon />
          </div>
          <div className={styles.rightContent}>
            {isAnimated && (
              <Progress
                className={styles.progressBar}
                comparisons={comparisons}
                setFadeIn={setFadeIn}
                setToDisplay={setToDisplay}
              />
            )}
            <Disclaimer
              language={language}
              comparisons={comparisons}
              unit={unit}
              value={value}
              id={animated ? 'animated' : 'static'}
            />
            <ul className={isAnimated ? styles.animatedComparisons : styles.comparisons}>
              {comparisons.map((comparison, index) => (
                <li
                  key={comparison}
                  className={
                    isAnimated
                      ? index === toDisplay && !fadeIn
                        ? styles.visibleAnimatedComparison
                        : styles.animatedComparison
                      : styles.comparison
                  }>
                  <SimpleValue value={preciseValue} comparison={comparison} language={language} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {randomize && (
          <button className={styles.randomize} title='Obtenir une nouvelle comparaison' onClick={randomize}>
            <RefreshIcon />
          </button>
        )}
      </div>
    </div>
  )
}

export default Equivalent
