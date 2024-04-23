'use client'

import classNames from 'classnames'
import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
import { ZodError } from 'zod'
import { Icon, IconId } from 'components/osezchanger/icons'
import styles from './Input.module.css'
import useError from './errors'

const Input = ({
  id,
  label,
  hint,
  errors,
  className,
  icon,
  large,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string
  icon?: IconId
  label?: string
  hint?: string
  maxWidth?: string
  color?: 'secondary'
  background?: 'white'
  errors?: ZodError | null
  large?: boolean
}) => {
  const error = useError(id, errors)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) {
      const blur = () => ref.current?.blur()
      const currentRef = ref.current
      currentRef.addEventListener('wheel', blur)
      return () => currentRef.removeEventListener('wheel', blur)
    }
  }, [ref])

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
            [styles.large]: large,
            [styles.inputError]: !!error,
          })}
          {...inputProps}
          ref={ref}
          id={`input-${id}`}
        />
        {icon && (
          <div className={styles.icon}>
            <Icon iconId={icon} />
          </div>
        )}
      </div>
      {error && (
        <div className={classNames(styles.error, 'text-xs')}>
          <Icon iconId='error' />
          {error}
        </div>
      )}
    </div>
  )
}

export default Input
