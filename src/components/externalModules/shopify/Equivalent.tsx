import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Language } from 'types/equivalent'
import { getNumberPrecision } from 'utils/formatNumberPrecision'
import LocalNumber from 'components/base/LocalNumber'
import EqualIcon from 'components/base/icons/equal'
import RefreshIcon from 'components/base/icons/refresh'
import Logo from '../Logo'
import SimpleValue from '../SimpleValue'
import styles from './Equivalent.module.css'

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
          {isAnimated && (
            <div
              className={styles.progressBar}
              style={{
                background: `radial-gradient(closest-side, white 59%, transparent 60% 100%), conic-gradient(var(--primary-20) ${progress}%, transparent 0)`,
              }}>
              <progress value={progress} className={styles.progress}>
                {progress}%
              </progress>
            </div>
          )}
          <div className={isAnimated ? styles.animatedEqual : styles.equal}>
            <EqualIcon />
          </div>
          <div className={isAnimated ? styles.animatedComparisons : styles.comparisons}>
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
          <button className={styles.randomize} title='Obtenir une nouvelle comparaison' onClick={randomize}>
            <RefreshIcon />
          </button>
        )}
      </div>
    </div>
  )
}

export default Equivalent
