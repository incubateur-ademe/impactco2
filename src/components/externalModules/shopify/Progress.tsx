import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
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
  const [progress, setProgress] = useState(0)

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
    setProgress(0)
    updateWithTimeout()

    return () => {
      if (displayedTimeoutRef.current) {
        clearTimeout(displayedTimeoutRef.current)
      }
    }
  }, [comparisons])

  return (
    <div
      className={className}
      style={{
        background: `radial-gradient(closest-side, white 59%, transparent 60% 100%), conic-gradient(var(--primary-20) ${progress}%, transparent 0)`,
      }}>
      <progress value={progress} className={styles.progress}>
        {progress}%
      </progress>
    </div>
  )
}

export default Progress
