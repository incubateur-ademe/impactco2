import React, { InputHTMLAttributes } from 'react'
import { Hint, Label, NotRequired, StyledInput } from './Input.styles'

const Input = ({
  id,
  label,
  hint,
  maxWidth,
  color,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label?: string
  hint?: string
  maxWidth?: string
  color?: 'secondary'
}) => {
  return (
    <div>
      {label && (
        <Label htmlFor={`text-input-${id}`}>
          {label}
          {!inputProps.required && <NotRequired> - Facultatif</NotRequired>}
          {hint && <Hint className='text-sm'>{hint}</Hint>}
        </Label>
      )}
      <StyledInput {...inputProps} id={`text-input-${id}`} $maxWidth={maxWidth} $color={color} />
    </div>
  )
}

export default Input
