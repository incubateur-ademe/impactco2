import React, { InputHTMLAttributes, ReactNode } from 'react'
import { Icon } from 'components/osezchanger/icons'
import { Check, Container, Label } from './CheckboxInput.styles'

const CheckboxInput = ({
  checked,
  setChecked,
  label,
  children,
  color,
  className,
  ...inputProps
}: {
  checked: boolean
  className?: string
  setChecked: (checked: boolean) => void
  label: ReactNode
  children?: ReactNode
  color?: 'secondary'
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Container $checked={checked} $color={color} className={className}>
      <input
        {...inputProps}
        type='checkbox'
        checked={checked}
        className={checked ? 'checked' : ''}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <Label>{label}</Label>
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
