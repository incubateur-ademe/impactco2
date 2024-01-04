import React, { InputHTMLAttributes, ReactNode } from 'react'
import { Icon } from 'components/osezchanger/icons'
import { Check, Container } from './CheckboxInput.styles'

const CheckboxInput = ({
  checked,
  setChecked,
  label,
  children,
  ...inputProps
}: {
  checked: boolean
  setChecked: (checked: boolean) => void
  label: string
  children?: ReactNode
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Container $checked={checked}>
      <input
        {...inputProps}
        type='checkbox'
        checked={checked}
        className={checked ? 'checked' : ''}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <span>{label}</span>
      {checked && (
        <Check>
          <Icon iconId='check' />
        </Check>
      )}
      {children}
    </Container>
  )
}

export default CheckboxInput
