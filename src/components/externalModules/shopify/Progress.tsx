import { useTranslations } from 'next-intl'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import PauseIcon from 'components/base/icons/pause'
import PlayIcon from 'components/base/icons/play'
import styles from './Progress.module.css'

const Progress = ({
  className,
  comparisons,
  setFadeIn,
  setToDisplay,
}: {
  className: string
  comparisons: string[]
  setFadeIn: Dispatch<SetStateAction<boolean>>
  setToDisplay: Dispatch<SetStateAction<number>>
}) => {
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  const displayedTimeoutRef = useRef<NodeJS.Timeout>()
  const fadeInTimeoutRef = useRef<NodeJS.Timeout>()

  const updateWithTimeout = useCallback(() => {
    setProgress((value) => value + 1)
    displayedTimeoutRef.current = setTimeout(updateWithTimeout, 50)
  }, [])

  useEffect(() => {
    if (paused) {
      if (displayedTimeoutRef.current) {
        clearTimeout(displayedTimeoutRef.current)
      }

      if (fadeInTimeoutRef.current) {
        clearTimeout(fadeInTimeoutRef.current)
      }
    } else {
      displayedTimeoutRef.current = setTimeout(updateWithTimeout, 50)
    }
  }, [paused])

  useEffect(() => {
    if (progress > 99) {
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
    setProgress(0)
    updateWithTimeout()

    return () => {
      if (displayedTimeoutRef.current) {
        clearTimeout(displayedTimeoutRef.current)
      }
    }
  }, [comparisons])

  return (
    <>
      <div
        className={className}
        style={{
          background: `radial-gradient(closest-side, white 59%, transparent 60% 100%), conic-gradient(var(--primary-20) ${progress}%, transparent 0)`,
        }}>
        <progress value={progress} className={styles.progress} max={100}>
          {progress}%
        </progress>
      </div>
      <button className={styles.button} onClick={() => setPaused(!paused)}>
        {paused ? <PlayIcon /> : <PauseIcon />}
        {paused ? 'Play' : 'Pause'}
      </button>
    </>
  )
}

export default Progress
