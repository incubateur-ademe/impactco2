'use client'

import classNames from 'classnames'
import React, { useState } from 'react'
import { ZodError } from 'zod'
import ErrorIcon from 'components/base/icons/error'
import FullStarIcon from 'components/base/icons/full-star'
import StarIcon from 'components/base/icons/star'
import styles from './Input.module.css'
import useError from './errors'

export type StarsProps = {
  label: string
  hint?: string
  required?: boolean
  id: string
  value?: number
  setValue: (value: number) => void
  errors?: ZodError | null
}

const isFull = (index: number, hovered: number, value?: number) => {
  if (hovered) {
    return index <= hovered
  }

  return value && index <= value
}

const Stars = ({ value, setValue, id, label, required, hint, errors }: StarsProps) => {
  const error = useError(id, errors)

  const [hovered, setHovered] = useState(0)

  return (
    <div>
      {label && (
        <div className={classNames(styles.label, { [styles.labelError]: !!error })}>
          {label}
          {required && <span className={styles.required}> *</span>}
          {hint && <span className={classNames(styles.hint, 'text-sm')}>{hint}</span>}
        </div>
      )}
      <div className={styles.starsButtons} onMouseLeave={() => setHovered(0)}>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
          <button
            aria-label={`Avis ${index} étoile${index === 1 ? '' : 's'}`}
            type='button'
            key={index}
            onClick={() => setValue(index)}
            data-testid={`stars-${id}-${index}`}
            onMouseEnter={() => setHovered(index)}>
            {isFull(index, hovered, value) ? <FullStarIcon /> : <StarIcon />}
          </button>
        ))}
      </div>
      {error && (
        <div className={classNames(styles.error, 'text-xs')}>
          <ErrorIcon />
          {error}
        </div>
      )}
    </div>
  )
}

export default Stars
