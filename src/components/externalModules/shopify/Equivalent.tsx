import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Language } from 'types/equivalent'
import Logo from '../Logo'
import SimpleValue from '../SimpleValue'
import Equal from './Equal'
import styles from './Equivalent.module.css'

const Equivalent = ({
  className,
  baseValue,
  comparisons,
  title,
  animated,
  url,
  language,
}: {
  className?: string
  baseValue: string
  comparisons: string[]
  title?: (unit: string, roundedValue: string, intValue: number) => ReactNode
  animated?: boolean
  url?: string
  language?: Language
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
  const value = Number.isNaN(intValue) ? 100000 : intValue

  const unit = value >= 1000 ? 'kg' : 'g'
  const unitValue = value >= 1000 ? value / 1000 : value
  const roundedValue = (Math.round(unitValue * 100) / 100).toLocaleString()

  return (
    <div className={className}>
      {title && title(unit, roundedValue, intValue)}
      <div className={styles.container}>
        <div className={styles.left}>
          <Logo value={value} url={url} />
          <div className={styles.leftContent}>
            <div className={styles.value} data-testid='etiquette-value'>
              {roundedValue}
            </div>
            <div className={styles.label}>
              {unit} CO<sub>2</sub>e
            </div>
          </div>
        </div>
        <div className={styles.right}>
          {isAnimated && (
            <div
              className={styles.progressBar}
              style={{
                background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(var(--primary-20) ${progress}%, transparent 0)`,
              }}>
              <progress value={progress} className={styles.progress}>
                {progress}%
              </progress>
            </div>
          )}
          <div className={isAnimated ? styles.animatedEqual : styles.equal}>
            <Equal />
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
                <SimpleValue value={value} comparison={comparison} language={language} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Equivalent
