import React, { ButtonHTMLAttributes, LinkHTMLAttributes } from 'react'
import { StyledLink } from './MagicLink.styles'
import NewTabIcon from './NewTabIcon'

const MagicLink = ({
  className,
  'data-testid': dataTestId,
  internal,
  noIcon,
  theme,
  ...rest
}: (ButtonHTMLAttributes<HTMLButtonElement> | ({ to: string } & LinkHTMLAttributes<HTMLAnchorElement>)) & {
  className?: string
  ['data-testid']?: string
  internal?: boolean
  noIcon?: boolean
  theme?: 'blue'
}) => {
  const external =
    'to' in rest && (rest.to.includes(':') || rest.to.includes('.') || (rest.to.includes('#') && !internal))
  return !('to' in rest) ? (
    <button className={className} data-testid={dataTestId || 'magic-link-button'} {...rest} />
  ) : (
    <StyledLink
      $theme={theme}
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
