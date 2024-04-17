import classNames from 'classnames'
import React, { ButtonHTMLAttributes } from 'react'
import { Icon, IconId } from '../osezchanger/icons'
import styles from './GhostButton.module.css'

const GhostButton = ({
  icon,
  children,
  iconPosition,
  size,
  ...buttonProps
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconId
  iconPosition?: 'right'
  children: string
  size?: 'sm'
  colored?: boolean
}) => {
  return (
    <button
      className={classNames(styles.button, {
        [styles.reverse]: iconPosition === 'right',
        [styles.small]: size === 'sm',
      })}
      {...buttonProps}
      name={children}>
      <Icon iconId={icon} /> {children}
    </button>
  )
}

export default GhostButton
