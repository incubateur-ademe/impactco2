'use client'

import classNames from 'classnames'
import { ReactNode } from 'react'
import styles from './Radio.module.css'

const Checkbox = ({
  id,
  label,
  hint,
  children,
  required,
  hiddenLabel,
}: {
  id: string
  label: string
  hint?: string
  children: ReactNode
  required?: boolean
  hiddenLabel?: boolean
}) => {
  return (
    <fieldset>
      <legend className={classNames(styles.legend, { 'ico2-hidden': hiddenLabel })} id={`input-${id}`}>
        {label}
        {required && <span className={styles.required}> *</span>}
        {hint && <span className={classNames(styles.hint, 'text-sm')}>{hint}</span>}
      </legend>
      <div className={styles.inputs}>{children}</div>
    </fieldset>
  )
}

export default Checkbox
