import React, { TextareaHTMLAttributes } from 'react'
import { Hint, Label, NotRequired, StyledTextArea } from './Input.styles'

const TextArea = ({
  id,
  label,
  hint,
  maxWidth,
  color,
  ...inputProps
}: {
  id: string
  label?: string
  hint?: string
  maxWidth?: string
  color?: 'secondary'
} & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <div>
      {label && (
        <Label htmlFor={`text-input-${id}`}>
          {label}
          {!inputProps.required && <NotRequired> - Facultatif</NotRequired>}
          {hint && <Hint className='text-sm'>{hint}</Hint>}
        </Label>
      )}
      <StyledTextArea rows={3} {...inputProps} id={`text-input-${id}`} $maxWidth={maxWidth} $color={color} />
    </div>
  )
}

export default TextArea
