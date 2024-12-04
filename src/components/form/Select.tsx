'use client'

import classNames from 'classnames'
import React, { SelectHTMLAttributes } from 'react'
import styles from './Input.module.css'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string
  label?: string
  inline?: boolean
  hint?: string
  padding?: 'sm' | 'lg'
}

const Select = ({ id, label, hint, inline, padding, className, children, ...selectProps }: SelectProps) => {
  return (
    <div className={inline ? styles.containerInline : styles.container}>
      {label && (
        <label className={classNames(styles.label, { [styles.labelInline]: inline })} htmlFor={`text-select-${id}`}>
          {label}
          {!selectProps.required && <span className={styles.notRequired}> - Facultatif</span>} :
          {hint && <span className={classNames(styles.hint, 'text-sm')}>{hint}</span>}
        </label>
      )}
      <div className={classNames(styles.selectWrapper, { [styles.smallSelectWrapper]: padding === 'sm' }, className)}>
        <select
          className={classNames(styles.select, { [styles.small]: padding === 'sm' })}
          data-testid={`text-select-${id}`}
          {...selectProps}
          id={`text-select-${id}`}>
          <>
            {selectProps.required && (
              <option value='' disabled hidden>
                Choisir une option
              </option>
            )}
            {children}
          </>
        </select>
      </div>
    </div>
  )
}

export default Select
