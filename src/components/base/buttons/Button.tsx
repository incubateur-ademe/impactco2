import React, { ButtonHTMLAttributes } from 'react'
import { Button as StyledButton } from './Button.styles'
import { Button as LinkButton } from './Link.styles'
import { Priority } from './priority'

const Button = ({
  asLink,
  priority,
  size,
  ...rest
}: { size?: 'sm' | 'lg'; priority?: Priority } & ButtonHTMLAttributes<HTMLButtonElement> & {
    asLink?: boolean
  }) => {
  return asLink ? (
    <LinkButton $priority={priority} {...rest} />
  ) : (
    <StyledButton $size={size} $priority={priority} {...rest} />
  )
}

export default Button
