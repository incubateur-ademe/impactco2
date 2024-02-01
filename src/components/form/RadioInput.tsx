import React, { Dispatch, InputHTMLAttributes, ReactNode, SetStateAction } from 'react'
import { Container } from './RadioInput.styles'

const RadioInput = ({
  selected,
  setSelected,
  value,
  label,
  children,
  priority,
  ...inputProps
}: {
  selected: string
  value: string
  setSelected: Dispatch<SetStateAction<string>>
  label: string
  children?: ReactNode
  priority?: 'secondary'
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Container $checked={selected === value} $priority={priority}>
      <input
        {...inputProps}
        type='radio'
        value={value}
        checked={selected === value}
        className={selected ? 'checked' : ''}
        onChange={(e) => {
          if (e.target.checked) {
            setSelected(value)
          }
        }}
      />
      <span>{label}</span>
      {children}
    </Container>
  )
}

export default RadioInput
