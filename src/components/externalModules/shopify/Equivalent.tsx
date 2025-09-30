import { useEffect, useMemo, useRef, useState } from 'react'
import { Language } from 'types/equivalent'
import { getNumberPrecision } from 'utils/formatNumberPrecision'
import CO2Quantity from 'components/base/CO2Quantity'
import EqualIcon from 'components/base/icons/equal'
import RefreshIcon from 'components/base/icons/refresh'
import useTrackingContext from '../../../providers/TrackingProvider'
import Logo from '../Logo'
import SimpleValue from '../SimpleValue'
import Disclaimer from './Disclaimer'
import Progress from './Progress'
import styles from './Equivalent.module.css'

const Equivalent = ({
  className,
  baseValue,
  comparisons,
  animated,
  url,
  language,
  randomize,
}: {
  className?: string
  baseValue: string | number
  comparisons: string[]
  animated?: boolean
  url?: string
  language: Language
  randomize?: () => void
}) => {
  const { trackOnce } = useTrackingContext()
  const ref = useRef<HTMLLIElement>(null)
  const isAnimated = useMemo(() => animated && comparisons.length > 1, [animated, comparisons])

  const [toDisplay, setToDisplay] = useState(0)
  const [isRandomized, setIsRandomize] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    if (isAnimated) {
      setToDisplay(0)
      setFadeIn(false)
    }
  }, [isAnimated, comparisons])

  useEffect(() => {
    if (isRandomized && ref.current) {
      ref.current.focus()
      setIsRandomize(false)
    }
  }, [ref, isRandomized])

  const intValue = Number(baseValue)
  const preciseValue = Number.isNaN(intValue) ? 100000 : intValue

  return (
    <div className={className}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Logo value={preciseValue} url={url} onClick={() => trackOnce('Logo')} />
          <CO2Quantity
            quantity={preciseValue / 1000}
            className={styles.leftContent}
            valueClassName={styles.value}
            data-testid='etiquette-value'
            secondary
            language={language}
          />
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
              baseValue={preciseValue}
              id={animated ? 'animated' : 'static'}
            />
            <ul className={isAnimated ? styles.animatedComparisons : styles.comparisons}>
              {comparisons.map((comparison, index) => (
                <li
                  tabIndex={-1}
                  ref={index === 0 ? ref : undefined}
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
          <button
            className={styles.randomize}
            title='Obtenir une nouvelle comparaison'
            onClick={() => {
              randomize()
              setIsRandomize(true)
            }}>
            <RefreshIcon />
          </button>
        )}
      </div>
    </div>
  )
}

export default Equivalent
