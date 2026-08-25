import classNames from 'classnames'
import { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, ForwardedRef, forwardRef } from 'react'
import IframeableLink from '../IframeableLink'
import NewTabIcon from '../NewTabIcon'
import buttonStyles from './Button.module.css'
import linkStyles from './Link.module.css'

const Link = (
  {
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
    noIcon?: boolean
  } & LinkProps &
    AnchorHTMLAttributes<HTMLAnchorElement>,
  ref: ForwardedRef<HTMLAnchorElement>
) => {
  const external = !internal && (rest.href.includes(':') || rest.href.includes('.') || rest.href.includes('#'))
  return (
    <IframeableLink
      ref={ref}
      className={classNames(asButton ? buttonStyles.button : linkStyles.link, className, {
        [buttonStyles.small]: rest.size === 'sm',
      })}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      {...rest}>
      {children}
      {!noIcon && !asButton && external && <NewTabIcon />}
    </IframeableLink>
  )
}

export default forwardRef(Link)
