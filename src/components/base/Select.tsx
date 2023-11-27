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
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 24 24' ><path fill='%23${(
    props
  ) =>
    (props.$color || props.theme.colors.main).replace(
      '#',
      ''
    )}' d='M12,13.1l5-4.9l1.4,1.4L12,15.9L5.6,9.5l1.4-1.4L12,13.1z'/></svg>");
  background-position: calc(100% - 0.5em) 50%;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  border: 0.125rem solid ${(props) => props.$color || props.theme.colors.main};
  border-radius: 0.5em;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  padding: 0.5em 2em 0.5em 1em;
`
export default function Select<T extends string>({
  name,
  className,
  label,
  value,
  color,
  children,
  onChange,
  'data-testid': dataTestId,
}: {
  name: string
  className?: string
  label?: string
  value: T
  color?: string
  children: ReactNode
  ['data-testid']?: string
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
        $color={color}
        onChange={(e) => {
          onChange({ value: e.currentTarget.value as T, name: name })
        }}>
        {children}
      </Input>
    </Wrapper>
  )
}
