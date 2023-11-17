import React, { ButtonHTMLAttributes } from 'react'
import { Icon, IconId } from '../icons'
import { Button } from './GhostButton.styles'

const GhostButton = ({
  icon,
  children,
  ...buttonProps
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon: IconId }) => {
  return (
    <Button {...buttonProps}>
      <Icon iconId={icon} /> {children}
    </Button>
  )
}

export default GhostButton
