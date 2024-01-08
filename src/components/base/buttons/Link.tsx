import { LinkProps } from 'next/link'
import React, { AnchorHTMLAttributes } from 'react'
import NewTabIcon from '../NewTabIcon'
import { ButtonLink } from './Button.styles'
import { StyledLink } from './Link.styles'
import { Priority } from './priority'

const Link = ({
  asButton,
  internal,
  priority,
  noIcon,
  children,
  size,
  ...rest
}: {
  asButton?: boolean
  size?: 'sm' | 'lg'
  internal?: boolean
  priority?: Priority
  noIcon?: boolean
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const external = !internal && (rest.href.includes(':') || rest.href.includes('.') || rest.href.includes('#'))
  return asButton ? (
    <ButtonLink
      $size={size}
      $priority={priority}
      target={external ? '_blank' : '_self'}
      rel={external ? 'noreferrer noopener' : undefined}
      {...rest}>
      {children}
    </ButtonLink>
  ) : (
    <StyledLink
      $priority={priority}
      target={external ? '_blank' : '_self'}
      rel={external ? 'noreferrer noopener' : undefined}
      {...rest}>
      {children}
      {!noIcon && external && <NewTabIcon />}
    </StyledLink>
  )
}

export default Link
