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
    <div aria-labelledby={`checkbox-legend-${id}`}>
      <legend className={styles.legend} id={`input-${id}`}>
        {label}
        {!required && <div className={styles.notRequired}> - Facultatif</div>}
        {hint && <div className={classNames(styles.hint, 'text-sm')}>{hint}</div>}
      </legend>
      <div className={styles.inputs}>{children}</div>
    </div>
  )
}

export default Checkbox
