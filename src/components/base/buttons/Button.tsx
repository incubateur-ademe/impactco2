import classNames from 'classnames'
import React, { ButtonHTMLAttributes, ForwardedRef, ReactNode, forwardRef } from 'react'
import buttonStyles from './Button.module.css'
import linkStyles from './Link.module.css'

const Button = (
  {
    asLink,
    className,
    icon,
    children,
    priority,
    size,
    ...rest
  }: { size?: 'sm' | 'lg'; priority?: 'outline'; icon?: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement> & {
      asLink?: boolean
    },
  ref: ForwardedRef<HTMLButtonElement>
) => {
  return (
    <button
      className={classNames(
        asLink ? linkStyles.link : buttonStyles.button,
        { [buttonStyles.outline]: priority === 'outline', [buttonStyles.small]: size === 'sm' },
        className
      )}
      ref={ref}
      {...rest}>
      {icon}
      {children}
    </button>
  )
}

export default forwardRef(Button)
