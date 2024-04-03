import classNames from 'classnames'
import React, { ButtonHTMLAttributes } from 'react'
import { Icon, IconId } from 'components/osezchanger/icons'
import buttonStyles from './Button.module.css'
import linkStyles from './Link.module.css'
import { Priority } from './priority'

const Button = ({
  asLink,
  className,
  icon,
  children,
  ...rest
}: { size?: 'sm' | 'lg'; priority?: Priority; icon?: IconId } & ButtonHTMLAttributes<HTMLButtonElement> & {
    asLink?: boolean
  }) => {
  return (
    <button className={classNames(asLink ? linkStyles.link : buttonStyles.button, className)} {...rest}>
      {icon && <Icon iconId={icon} />}
      {children}
    </button>
  )
}

export default Button
