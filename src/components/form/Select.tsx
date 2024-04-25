'use client'

import classNames from 'classnames'
import React, { SelectHTMLAttributes } from 'react'
import styles from './Input.module.css'

const Select = ({
  id,
  label,
  hint,
  inline,
  small,
  ...selectProps
}: SelectHTMLAttributes<HTMLSelectElement> & {
  id: string
  label?: string
  inline?: boolean
  hint?: string
  small?: boolean
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
      <div className={classNames(styles.selectWrapper, { [styles.smallSelectWrapper]: small })}>
        <select
          className={classNames(styles.select, { [styles.small]: small })}
          {...selectProps}
          id={`text-select-${id}`}
        />
      </div>
    </div>
  )
}

export default Select
