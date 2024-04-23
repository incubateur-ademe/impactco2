'use client'

import classNames from 'classnames'
import React, { SelectHTMLAttributes } from 'react'
import styles from './Input.module.css'

const Select = ({
  id,
  label,
  hint,
  inline,
  ...selectProps
}: SelectHTMLAttributes<HTMLSelectElement> & {
  id: string
  label?: string
  inline?: boolean
  hint?: string
}) => {
  return (
    <div className={inline ? styles.containerInline : ''}>
      {label && (
        <label className={classNames(styles.label, { [styles.labelInline]: inline })} htmlFor={`input-${id}`}>
          {label}
          {!selectProps.required && <div className={styles.notRequired}> - Facultatif</div>}
          {hint && <div className={classNames(styles.hint, 'text-sm')}>{hint}</div>}
        </label>
      )}
      <select className={styles.input} {...selectProps} id={`text-select-${id}`} />
    </div>
  )
}

export default Select
