import React, { ReactNode } from 'react'
import { Hint, Inputs, Legend, NotRequired } from './Radio.styles'

const Radio = ({
  id,
  label,
  hint,
  children,
  required,
}: {
  id: string
  label: string
  hint?: string
  children: ReactNode
  required?: boolean
}) => {
  return (
    <div aria-labelledby={`radio-legend-${id}`}>
      <Legend id={`radio-legend-${id}`}>
        {label}
        {!required && <NotRequired> - Facultatif</NotRequired>}
        {hint && <Hint className='text-sm'>{hint}</Hint>}
      </Legend>
      <Inputs>{children}</Inputs>
    </div>
  )
}

export default Radio
