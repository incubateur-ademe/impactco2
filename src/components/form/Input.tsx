'use client'

import classNames from 'classnames'
import React, { InputHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react'
import { ZodError } from 'zod'
import ErrorIcon from 'components/base/icons/error'
import styles from './Input.module.css'
import useError from './errors'

const Input = ({
  id,
  label,
  hint,
  errors,
  className,
  icon,
  unit,
  secondaryUnitStyle,
  padding,
  onUnitClick,
  extraWidth,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label?: string
  hint?: string
  icon?: ReactNode
  color?: 'secondary'
  background?: 'white'
  errors?: ZodError | null
  unit?: ReactNode
  secondaryUnitStyle?: boolean
  padding?: 'sm' | 'lg'
  onUnitClick?: () => void
  extraWidth?: string
}) => {
  const error = useError(id, errors)
  const ref = useRef<HTMLInputElement>(null)
  const unitRef = useRef<HTMLButtonElement>(null)
  const [unitDim, setUnitDim] = useState<{ width: number; height: number } | undefined>(undefined)

  useEffect(() => {
    if (ref.current) {
      const blur = () => ref.current?.blur()
      const currentRef = ref.current
      currentRef.addEventListener('wheel', blur, { passive: true })
      return () => currentRef.removeEventListener('wheel', blur)
    }
  }, [ref])

  useEffect(() => {
    if (unit) {
      const onResize = () => {
        if (unitRef.current) {
          const dim = unitRef.current.getBoundingClientRect()
          setUnitDim({ width: dim.width, height: dim.height })
        }
      }
      window.addEventListener('resize', onResize)
      onResize()

      return () => {
        window.removeEventListener('resize', onResize)
      }
    }
  }, [unit, unitRef])

  return (
    <div className={className}>
      {label && (
        <label className={classNames(styles.label, { [styles.labelError]: !!error })} htmlFor={`input-${id}`}>
          {label}
          {!inputProps.required && <div className={styles.notRequired}> - Facultatif</div>}
          {hint && <div className={classNames(styles.hint, 'text-sm')}>{hint}</div>}
        </label>
      )}
      <div
        className={styles.inputContainer}
        style={{ width: unitDim && extraWidth ? `calc(${extraWidth} + ${unitDim.width}px)` : undefined }}>
        <input
          className={classNames(styles.input, {
            [styles.withIcon]: icon,
            [styles.small]: padding === 'sm',
            [styles.large]: padding === 'lg',
            [styles.inputError]: !!error,
          })}
          {...inputProps}
          ref={ref}
          id={`input-${id}`}
          data-testid={`input-${id}`}
          style={{
            height: unitDim ? `calc(${unitDim.height}px + 1rem)` : undefined,
            paddingRight: unitDim ? `calc(${unitDim.width}px + 1.5rem)` : '1rem',
          }}
        />
        {icon && <div className={styles.icon}>{icon}</div>}
        {unit && (
          <button
            disabled={!onUnitClick}
            className={classNames(secondaryUnitStyle ? styles.secondaryUnit : styles.unit, {
              [styles.clickeable]: onUnitClick,
            })}
            ref={unitRef}
            onClick={onUnitClick}>
            {unit}
          </button>
        )}
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

export default Input
