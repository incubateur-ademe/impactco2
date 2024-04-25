'use client'

import classNames from 'classnames'
import React, { InputHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react'
import { ZodError } from 'zod'
import ErrorIcon from 'components/osezchanger/icons/error'
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
  maxWidth,
  secondaryUnitStyle,
  small,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label?: string
  hint?: string
  icon?: ReactNode
  maxWidth?: string
  color?: 'secondary'
  background?: 'white'
  errors?: ZodError | null
  unit?: string
  secondaryUnitStyle?: boolean
  small?: boolean
}) => {
  const error = useError(id, errors)
  const ref = useRef<HTMLInputElement>(null)
  const unitRef = useRef<HTMLDivElement>(null)
  const [paddingRight, setPaddingRight] = useState('1rem')

  useEffect(() => {
    if (ref.current) {
      const blur = () => ref.current?.blur()
      const currentRef = ref.current
      currentRef.addEventListener('wheel', blur)
      return () => currentRef.removeEventListener('wheel', blur)
    }
  }, [ref])

  useEffect(() => {
    if (unit) {
      const onResize = () => {
        if (unitRef.current) {
          const { width } = unitRef.current.getBoundingClientRect()
          setPaddingRight(`calc(${width}px + 1.5rem)`)
        }
      }
      onResize()
      window.addEventListener('resize', onResize)

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
      <div className={styles.inputContainer}>
        <input
          className={classNames(styles.input, {
            [styles.withIcon]: icon,
            [styles.small]: small,
            [styles.inputError]: !!error,
          })}
          {...inputProps}
          ref={ref}
          id={`input-${id}`}
          style={{ paddingRight, maxWidth: maxWidth }}
        />
        {icon && <div className={styles.icon}>{icon}</div>}
        {unit && (
          <div className={secondaryUnitStyle ? styles.secondaryUnit : styles.unit} ref={unitRef}>
            {unit}
          </div>
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
