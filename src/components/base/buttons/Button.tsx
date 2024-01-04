import React, { ButtonHTMLAttributes } from 'react'
import { Button as StyledButton } from './Button.styles'
import { Button as LinkButton } from './Link.styles'

const Button = ({
  asLink,
  color,
  size,
  ...rest
}: { size?: 'sm' | 'lg'; color?: 'secondary' } & ButtonHTMLAttributes<HTMLButtonElement> & {
    asLink?: boolean
  }) => {
  return asLink ? <LinkButton $color={color} {...rest} /> : <StyledButton $size={size} $color={color} {...rest} />
}

export default Button
