'use client'

import classNames from 'classnames'
import { ReactNode } from 'react'
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
    <fieldset className={className}>
      <legend className={classNames(styles.legend, { [styles.legendError]: !!error })} id={`input-${id}`}>
        {label}
        {required && <span className={styles.required}> *</span>}
        {hint && <span className={classNames(styles.hint, 'text-sm')}>{hint}</span>}
      </legend>
      <div className={styles.inputs}>{children}</div>
      {error && (
        <div className={classNames(inputStyles.error, 'text-xs')}>
          <ErrorIcon />
          {error}
        </div>
      )}
    </fieldset>
  )
}

export default Radio
