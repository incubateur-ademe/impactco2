import classNames from 'classnames'
import React, { TextareaHTMLAttributes } from 'react'
import { ZodError } from 'zod'
import ErrorIcon from 'components/base/icons/error'
import styles from './Input.module.css'
import useError from './errors'

const TextArea = ({
  id,
  label,
  hint,
  errors,
  ...inputProps
}: {
  id: string
  label?: string
  hint?: string
  color?: 'secondary'
  errors?: ZodError | null
} & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const error = useError(id, errors)

  return (
    <div>
      {label && (
        <label className={classNames(styles.label, { [styles.labelError]: !!error })} htmlFor={`input-${id}`}>
          {label}
          {!inputProps.required && <span className={styles.notRequired}> - Facultatif</span>}
          {hint && <span className={classNames(styles.hint, 'text-sm')}>{hint}</span>}
        </label>
      )}
      <textarea
        className={classNames(styles.textarea, { [styles.inputError]: !!error })}
        rows={3}
        {...inputProps}
        id={`input-${id}`}
      />
      {error && (
        <div className={classNames(styles.error, 'text-xs')}>
          <ErrorIcon />
          {error}
        </div>
      )}
    </div>
  )
}

export default TextArea
