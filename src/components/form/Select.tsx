import React, { SelectHTMLAttributes } from 'react'
import { Container, Hint, Label, NotRequired, StyledSelect } from './Input.styles'

const Select = ({
  id,
  label,
  hint,
  maxWidth,
  color,
  inline,
  ...selectProps
}: SelectHTMLAttributes<HTMLSelectElement> & {
  id: string
  label?: string
  hint?: string
  maxWidth?: string
  inline?: boolean
  color?: 'secondary'
}) => {
  return (
    <Container $inline={inline}>
      {label && (
        <Label htmlFor={`text-select-${id}`} $inline={inline}>
          {label}
          {!selectProps.required && <NotRequired> - Facultatif</NotRequired>}
          {hint && <Hint className='text-sm'>{hint}</Hint>}
        </Label>
      )}
      <StyledSelect {...selectProps} id={`text-select-${id}`} $maxWidth={maxWidth} $color={color} />
    </Container>
  )
}

export default Select
