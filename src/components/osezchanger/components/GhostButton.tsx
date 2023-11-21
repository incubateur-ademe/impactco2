import React, { ButtonHTMLAttributes } from 'react'
import { Icon, IconId } from '../icons'
import { Button } from './GhostButton.styles'

const GhostButton = ({
  icon,
  children,
  iconPosition,
  ...buttonProps
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon: IconId; iconPosition?: 'right'; children: string }) => {
  return (
    <Button {...buttonProps} $reverse={iconPosition === 'right'} name={children}>
      <Icon iconId={icon} /> {children}
    </Button>
  )
}

export default GhostButton
