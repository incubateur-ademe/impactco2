import classNames from 'classnames'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Language } from 'types/equivalent'
import { getNumberPrecision } from 'utils/formatNumberPrecision'
import LocalNumber from 'components/base/LocalNumber'
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
  animated,
}: {
  baseValue: string | number
  comparisons: string[]
  language: Language
  randomize?: () => void
  animated?: boolean
}) => {
  const isAnimated = useMemo(() => animated && comparisons.length > 1, [animated, comparisons])
  const [toDisplay, setToDisplay] = useState(0)
  const [progress, setProgress] = useState(0)
  const [fadeIn, setFadeIn] = useState(false)

  const displayedTimeoutRef = useRef<NodeJS.Timeout>()
  const fadeInTimeoutRef = useRef<NodeJS.Timeout>()

  const update = useCallback(() => {
    setProgress((value) => (value + 1) % 100)
  }, [])

  const updateWithTimeout = useCallback(() => {
    update()
    displayedTimeoutRef.current = setTimeout(updateWithTimeout, 50)
  }, [])

  useEffect(() => {
    if (progress === 99) {
      clearTimeout(displayedTimeoutRef.current)
      setFadeIn(true)
      fadeInTimeoutRef.current = setTimeout(() => {
        setFadeIn(false)
        setToDisplay((value) => (value + 1) % comparisons.length)
        setProgress(0)
        setTimeout(updateWithTimeout, 1000)
      }, 1000)

      return () => {
        if (fadeInTimeoutRef.current) {
          clearTimeout(fadeInTimeoutRef.current)
        }
      }
    }
  }, [progress])

  useEffect(() => {
    if (isAnimated) {
      setToDisplay(0)
      setProgress(0)
      setFadeIn(false)
      updateWithTimeout()
    }
    return () => {
      if (displayedTimeoutRef.current) {
        clearTimeout(displayedTimeoutRef.current)
      }
    }
  }, [isAnimated, comparisons])
  const intValue = Number(baseValue)
  const preciseValue = Number.isNaN(intValue) ? 100000 : intValue
  const { unit, value } = getNumberPrecision(preciseValue / 1000)

  return (
    <div className={classNames(styles.container, { [styles.withRandomize]: !!randomize })}>
      <div className={baseStyles.top}>
        <div className={styles.leftContent}>
          <div className={baseStyles.value} data-testid='etiquette-value'>
            <LocalNumber number={value} />
          </div>
          <div className={baseStyles.label}>{unit} CO₂e</div>
        </div>
        <Logo value={preciseValue * 1000} right />
      </div>
      <div className={baseStyles.rightColumn}>
        {isAnimated && (
          <div
            className={baseStyles.progressBarColumn}
            style={{
              background: `radial-gradient(closest-side, white 59%, transparent 60% 100%), conic-gradient(var(--primary-20) ${progress}%, transparent 0)`,
            }}>
            <progress value={progress} className={baseStyles.progress}>
              {progress}%
            </progress>
          </div>
        )}
        <div className={isAnimated ? baseStyles.animatedEqualColumn : baseStyles.equalColumn}>
          <EqualIcon />
        </div>
        <div className={isAnimated ? styles.animatedComparisonsColumn : ''}>
          {comparisons.map((comparison, index) => (
            <div
              key={comparison}
              className={
                isAnimated
                  ? index === toDisplay && !fadeIn
                    ? styles.visibleAnimatedComparison
                    : styles.animatedComparison
                  : styles.comparison
              }>
              <SimpleValue value={preciseValue} comparison={comparison} language={language} />
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
