import React, { ButtonHTMLAttributes, LinkHTMLAttributes } from 'react'
import { Button, StyledLink } from './MagicLink.styles'
import NewTabIcon from './NewTabIcon'

const MagicLink = ({
  className,
  'data-testid': dataTestId,
  internal,
  noIcon,
  color,
  ...rest
}: (ButtonHTMLAttributes<HTMLButtonElement> | ({ to: string } & LinkHTMLAttributes<HTMLAnchorElement>)) & {
  className?: string
  ['data-testid']?: string
  internal?: boolean
  noIcon?: boolean
  color?: 'blue'
}) => {
  const external =
    'to' in rest && (rest.to.includes(':') || rest.to.includes('.') || (rest.to.includes('#') && !internal))
  return !('to' in rest) ? (
    <Button $color={color} className={className} data-testid={dataTestId || 'magic-link-button'} {...rest} />
  ) : (
    <StyledLink
      $color={color}
      className={className}
      href={rest.to}
      target={rest.to.includes(':') || rest.to.includes('.') ? '_blank' : '_self'}
      rel={external ? 'noreferrer noopener' : undefined}
      data-testid={dataTestId || `magic-link-${rest.to}`}
      {...rest}>
      {rest.children}
      {!noIcon && external && <NewTabIcon />}
    </StyledLink>
  )
}

export default MagicLink
