'use client'

import classNames from 'classnames'
import React, { ReactNode } from 'react'
import { ZodError } from 'zod'
import ErrorIcon from 'components/base/icons/error'
import inputStyles from './Input.module.css'
import styles from './Radio.module.css'
import useError from './errors'

export type RadioProps = {
  id: string
  label: ReactNode
  hint?: string
  required?: boolean
  errors?: ZodError | null
  className?: string
}

const Radio = ({ id, label, hint, children, required, errors, className }: RadioProps & { children: ReactNode }) => {
  const error = useError(id, errors)

  return (
    <div aria-labelledby={`input-${id}`} className={className}>
      <legend className={classNames(styles.legend, { [styles.legendError]: !!error })} id={`input-${id}`}>
        {label}
        {!required && <div className={styles.notRequired}> - Facultatif</div>}
        {hint && <div className={classNames(styles.hint, 'text-sm')}>{hint}</div>}
      </legend>
      <div className={styles.inputs}>{children}</div>
      {error && (
        <div className={classNames(inputStyles.error, 'text-xs')}>
          <ErrorIcon />
          {error}
        </div>
      )}
    </div>
  )
}

export default Radio
