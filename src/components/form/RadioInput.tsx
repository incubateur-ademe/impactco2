'use client'

import classNames from 'classnames'
import React, { Dispatch, InputHTMLAttributes, ReactNode, SetStateAction } from 'react'
import styles from './RadioInput.module.css'

const RadioInput = ({
  selected,
  setSelected,
  value,
  label,
  children,
  ...inputProps
}: {
  selected: string
  value: string
  setSelected: Dispatch<SetStateAction<string>>
  label: string
  children?: ReactNode
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={styles.container}>
      <label className={classNames(styles.legend, { [styles.checked]: selected === value })}>
        <input
          {...inputProps}
          type='radio'
          value={value}
          checked={selected === value}
          className={selected ? 'checked' : ''}
          onChange={(e) => {
            if (e.target.checked) {
              setSelected(value)
            }
          }}
        />
        <span>{label}</span>
      </label>
      {children}
    </div>
  )
}

export default RadioInput
