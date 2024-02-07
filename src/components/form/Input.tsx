import React, { InputHTMLAttributes } from 'react'
import { ZodError } from 'zod'
import { Icon } from 'components/osezchanger/icons'
import { Error, Hint, Label, NotRequired, StyledInput } from './Input.styles'
import useError from './errors'

const Input = ({
  id,
  label,
  hint,
  maxWidth,
  color,
  background,
  errors,
  className,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label?: string
  hint?: string
  maxWidth?: string
  color?: 'secondary'
  background?: 'white'
  errors?: ZodError | null
}) => {
  const error = useError(id, errors)

  return (
    <div className={className}>
      {label && (
        <Label htmlFor={`input-${id}`} $error={!!error}>
          {label}
          {!inputProps.required && <NotRequired> - Facultatif</NotRequired>}
          {hint && <Hint className='text-sm'>{hint}</Hint>}
        </Label>
      )}
      <StyledInput
        {...inputProps}
        id={`input-${id}`}
        $maxWidth={maxWidth}
        $color={color}
        $background={background}
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

export default Input
