import React, { ReactNode } from 'react'
import { ZodError } from 'zod'
import { Icon } from 'components/osezchanger/icons'
import { Error } from './Input.styles'
import { Hint, Inputs, Legend, NotRequired } from './Radio.styles'
import useError from './errors'

export type RadioProps = {
  id: string
  label: string
  hint?: string
  required?: boolean
  errors?: ZodError | null
}

const Radio = ({ id, label, hint, children, required, errors }: RadioProps & { children: ReactNode }) => {
  const error = useError(id, errors)

  return (
    <div aria-labelledby={`input-${id}`}>
      <Legend id={`input-${id}`} $error={!!error}>
        {label}
        {!required && <NotRequired> - Facultatif</NotRequired>}
        {hint && <Hint className='text-sm'>{hint}</Hint>}
      </Legend>
      <Inputs>{children}</Inputs>
      {error && (
        <Error className='text-xs'>
          <Icon iconId='error' />
          {error}
        </Error>
      )}
    </div>
  )
}

export default Radio
