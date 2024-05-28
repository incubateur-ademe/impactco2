'use client'

import classNames from 'classnames'
import React, { SelectHTMLAttributes } from 'react'
import styles from './Input.module.css'

const Select = ({
  id,
  label,
  hint,
  inline,
  padding,
  className,
  ...selectProps
}: SelectHTMLAttributes<HTMLSelectElement> & {
  id: string
  label?: string
  inline?: boolean
  hint?: string
  padding?: 'sm' | 'lg'
}) => {
  return (
    <div className={inline ? styles.containerInline : ''}>
      {label && (
        <label className={classNames(styles.label, { [styles.labelInline]: inline })} htmlFor={`text-select-${id}`}>
          {label}
          {!selectProps.required && <div className={styles.notRequired}> - Facultatif</div>}
          {hint && <div className={classNames(styles.hint, 'text-sm')}>{hint}</div>}
        </label>
      )}
      <div className={classNames(styles.selectWrapper, { [styles.smallSelectWrapper]: padding === 'sm' }, className)}>
        <select
          className={classNames(styles.select, { [styles.small]: padding === 'sm' })}
          data-testid={`text-select-${id}`}
          {...selectProps}
          id={`text-select-${id}`}
        />
      </div>
    </div>
  )
}

export default Select
