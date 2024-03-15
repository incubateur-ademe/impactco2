import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
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
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) {
      const blur = () => ref.current?.blur()
      const currentRef = ref.current
      currentRef.addEventListener('wheel', blur)
      return () => currentRef.removeEventListener('wheel', blur)
    }
  }, [ref])

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
        ref={ref}
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
