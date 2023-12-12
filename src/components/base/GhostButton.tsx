import React, { ButtonHTMLAttributes } from 'react'
import { Icon, IconId } from '../osezchanger/icons'
import { Button } from './GhostButton.styles'

const GhostButton = ({
  icon,
  children,
  iconPosition,
  size,
  colored,
  ...buttonProps
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconId
  iconPosition?: 'right'
  children: string
  size?: 'sm'
  colored?: boolean
}) => {
  return (
    <Button {...buttonProps} $colored={colored} $reverse={iconPosition === 'right'} name={children} $size={size}>
      <Icon iconId={icon} /> {children}
    </Button>
  )
}

export default GhostButton
