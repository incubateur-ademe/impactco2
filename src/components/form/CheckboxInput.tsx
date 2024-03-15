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
    <Container $checked={checked} $color={color} className={className} data-testid={dataTestId}>
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
