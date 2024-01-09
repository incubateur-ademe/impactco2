import React from 'react'
import { Icon } from '../icons'
import { Button } from './Information.styles'

const Information = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button data-testid='hypothesis-button' onClick={onClick} aria-label="Voir plus d'informations">
      <Icon iconId='information' />
    </Button>
  )
}

export default Information
