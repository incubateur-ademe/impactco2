'use client'

import classNames from 'classnames'
import React, { ReactNode } from 'react'
import styles from './Radio.module.css'

const Checkbox = ({
  id,
  label,
  hint,
  children,
  required,
}: {
  id: string
  label: string
  hint?: string
  children: ReactNode
  required?: boolean
}) => {
  return (
    <fieldset>
      <legend className={styles.legend} id={`input-${id}`}>
        {label}
        {required && <span className={styles.required}> *</span>}
        {hint && <span className={classNames(styles.hint, 'text-sm')}>{hint}</span>}
      </legend>
      <div className={styles.inputs}>{children}</div>
    </fieldset>
  )
}

export default Checkbox
