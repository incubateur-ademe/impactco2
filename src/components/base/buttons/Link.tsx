import classNames from 'classnames'
import NextLink, { LinkProps } from 'next/link'
import React, { AnchorHTMLAttributes } from 'react'
import NewTabIcon from '../NewTabIcon'
import buttonStyles from './Button.module.css'
import linkStyles from './Link.module.css'
import { Priority } from './priority'

const Link = ({
  asButton,
  internal,
  noIcon,
  children,
  className,
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
  return (
    <NextLink
      className={classNames(asButton ? buttonStyles.button : linkStyles.link, className)}
      target={external ? '_blank' : '_self'}
      rel={external ? 'noreferrer noopener' : undefined}
      {...rest}>
      {children}
      {!noIcon && !asButton && external && <NewTabIcon />}
    </NextLink>
  )
}

export default Link
