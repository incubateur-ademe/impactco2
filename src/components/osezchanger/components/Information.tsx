import React from 'react'
import InformationIcon from '../../base/icons/information'
import { Button } from './Information.styles'

const Information = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button data-testid='hypothesis-button' onClick={onClick} aria-label="Voir plus d'informations">
      <InformationIcon />
    </Button>
  )
}

export default Information
