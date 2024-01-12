import React, { ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
`
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`
const Input = styled.select<{ $color?: string }>`
  appearance: none;
  background-color: transparent;
  background-image: ${({ $color }) =>
    $color
      ? `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23${$color.replace(
          '#',
          ''
        )}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`
      : 'var(--dropdown-arrow-primary)'};
  background-position: calc(100% - 0.5em) 50%;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  border: 0.125rem solid ${({ $color }) => $color || 'var(--primary-50)'};
  border-radius: 0.5em;
  color: ${({ $color }) => $color || 'var(--primary-50)'};
  cursor: pointer;
  padding: 0.5em 2em 0.5em 1em;
`

export default function Select<T extends string>({
  name,
  className,
  label,
  value,
  children,
  onChange,
  color,
  'data-testid': dataTestId,
}: {
  name: string
  className?: string
  label?: string
  value: T
  children: ReactNode
  ['data-testid']?: string
  color?: string
  onChange: (arg: { value: T; name: string }) => void
}) {
  return (
    <Wrapper className={className}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        id={name}
        data-testid={dataTestId}
        name={name}
        value={value}
        onChange={(e) => {
          onChange({ value: e.currentTarget.value as T, name: name })
        }}
        $color={color}>
        {children}
      </Input>
    </Wrapper>
  )
}
