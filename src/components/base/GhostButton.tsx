'use client'

import classNames from 'classnames'
import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './GhostButton.module.css'

const GhostButton = ({
  icon,
  children,
  iconPosition,
  size,
  ...buttonProps
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
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
      {icon} {children}
    </button>
  )
}

export default GhostButton
