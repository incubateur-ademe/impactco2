import React, { useState } from 'react'
import { ZodError } from 'zod'
import { Icon } from 'components/osezchanger/icons'
import { Error, Hint, Label, NotRequired, StarsButtons } from './Input.styles'
import useError from './errors'

export type StarsProps = {
  label: string
  hint?: string
  required?: boolean
  id: string
  value?: number
  setValue: (value: number) => void
  errors?: ZodError | null
}

const isFull = (index: number, hovered: number, value?: number) => {
  if (hovered) {
    return index <= hovered
  }

  return value && index <= value
}

const Stars = ({ value, setValue, id, label, required, hint, errors }: StarsProps) => {
  const error = useError(id, errors)

  const [hovered, setHovered] = useState(0)

  return (
    <div>
      {label && (
        <Label $error={!!error}>
          {label}
          {!required && <NotRequired> - Facultatif</NotRequired>}
          {hint && <Hint className='text-sm'>{hint}</Hint>}
        </Label>
      )}
      <StarsButtons onMouseLeave={() => setHovered(0)}>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
          <button
            aria-label={`Avis ${index} étoile${index === 1 ? '' : 's'}`}
            type='button'
            key={index}
            onClick={() => setValue(index)}
            data-testid={`stars-${id}-${index}`}
            onMouseEnter={() => setHovered(index)}>
            <Icon iconId={isFull(index, hovered, value) ? 'full-star' : 'star'} />
          </button>
        ))}
      </StarsButtons>
      {error && (
        <Error className='text-xs'>
          <Icon iconId='error' />
          {error}
        </Error>
      )}
    </div>
  )
}

export default Stars
