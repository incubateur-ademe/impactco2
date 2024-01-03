import React, { TextareaHTMLAttributes } from 'react'
import { ZodError } from 'zod'
import { Icon } from 'components/osezchanger/icons'
import { Error, Hint, Label, NotRequired, StyledTextArea } from './Input.styles'
import useError from './errors'

const TextArea = ({
  id,
  label,
  hint,
  maxWidth,
  color,
  errors,
  ...inputProps
}: {
  id: string
  label?: string
  hint?: string
  maxWidth?: string
  color?: 'secondary'
  errors?: ZodError | null
} & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const error = useError(id, errors)

  return (
    <div>
      {label && (
        <Label htmlFor={`input-${id}`} $error={!!error}>
          {label}
          {!inputProps.required && <NotRequired> - Facultatif</NotRequired>}
          {hint && <Hint className='text-sm'>{hint}</Hint>}
        </Label>
      )}
      <StyledTextArea
        rows={3}
        {...inputProps}
        id={`input-${id}`}
        $maxWidth={maxWidth}
        $color={color}
        $error={!!error}
      />
      {error && (
        <Error className='text-xs'>
          <Icon iconId='error' />
          {error}
        </Error>
      )}
    </div>
  )
}

export default TextArea
