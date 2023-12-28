import React, { SelectHTMLAttributes } from 'react'
import { Hint, Label, NotRequired, StyledSelect } from './Input.styles'

const Select = ({
  id,
  label,
  hint,
  maxWidth,
  color,
  ...selectProps
}: SelectHTMLAttributes<HTMLSelectElement> & {
  id: string
  label?: string
  hint?: string
  maxWidth?: string
  color?: 'secondary'
}) => {
  return (
    <div>
      {label && (
        <Label htmlFor={`text-select-${id}`}>
          {label}
          {!selectProps.required && <NotRequired> - Facultatif</NotRequired>}
          {hint && <Hint className='text-sm'>{hint}</Hint>}
        </Label>
      )}
      <StyledSelect {...selectProps} id={`text-select-${id}`} $maxWidth={maxWidth} $color={color} />
    </div>
  )
}

export default Select
