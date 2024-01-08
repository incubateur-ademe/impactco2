import { LinkProps } from 'next/link'
import React, { AnchorHTMLAttributes } from 'react'
import NewTabIcon from '../NewTabIcon'
import { ButtonLink } from './Button.styles'
import { StyledLink } from './Link.styles'

const Link = ({
  asButton,
  internal,
  color,
  noIcon,
  children,
  size,
  ...rest
}: {
  asButton?: boolean
  size?: 'sm' | 'lg'
  internal?: boolean
  color?: 'secondary' | 'secondary-dark'
  noIcon?: boolean
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const external = !internal && (rest.href.includes(':') || rest.href.includes('.') || rest.href.includes('#'))
  return asButton ? (
    <ButtonLink
      $size={size}
      $color={color}
      target={external ? '_blank' : '_self'}
      rel={external ? 'noreferrer noopener' : undefined}
      {...rest}>
      {children}
    </ButtonLink>
  ) : (
    <StyledLink
      $color={color}
      target={external ? '_blank' : '_self'}
      rel={external ? 'noreferrer noopener' : undefined}
      {...rest}>
      {children}
      {!noIcon && external && <NewTabIcon />}
    </StyledLink>
  )
}

export default Link
