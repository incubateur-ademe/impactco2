import classNames from 'classnames'
import React, { TextareaHTMLAttributes } from 'react'
import { ZodError } from 'zod'
import { Icon } from 'components/osezchanger/icons'
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
  maxWidth?: string
  color?: 'secondary'
  errors?: ZodError | null
} & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const error = useError(id, errors)

  return (
    <div>
      {label && (
        <label className={classNames(styles.label, { [styles.labelError]: !!error })} htmlFor={`input-${id}`}>
          {label}
          {!inputProps.required && <div className={styles.notRequired}> - Facultatif</div>}
          {hint && <div className={classNames(styles.hint, 'text-sm')}>{hint}</div>}
        </label>
      )}
      <textarea
        className={classNames(styles.input, { [styles.inputError]: !!error })}
        rows={3}
        {...inputProps}
        id={`input-${id}`}
      />
      {error && (
        <div className={classNames(styles.error, 'text-xs')}>
          <Icon iconId='error' />
          {error}
        </div>
      )}
    </div>
  )
}

export default TextArea
