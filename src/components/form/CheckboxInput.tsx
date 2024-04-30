import classNames from 'classnames'
import React, { InputHTMLAttributes, ReactNode } from 'react'
import CheckIcon from 'components/osezchanger/icons/check'
import styles from './CheckboxInput.module.css'

const CheckboxInput = ({
  checked,
  setChecked,
  label,
  children,
  'data-testid': dataTestId,
  ...inputProps
}: {
  checked: boolean
  className?: string
  setChecked: (checked: boolean) => void
  label: ReactNode
  children?: ReactNode
  color?: 'secondary'
  ['data-testid']?: string
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={styles.container} data-testid={dataTestId}>
      <label className={classNames(styles.legend, { [styles.checked]: checked })}>
        <input
          {...inputProps}
          type='checkbox'
          checked={checked}
          className={checked ? 'checked' : ''}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span>{label}</span>
        {checked && (
          <div className={styles.check}>
            <CheckIcon />
          </div>
        )}
      </label>
      {children}
    </div>
  )
}

export default CheckboxInput
