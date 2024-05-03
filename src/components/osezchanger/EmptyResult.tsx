import React from 'react'
import SprinklesIcon from '../base/icons/sprinkles'
import { Container } from './EmptyResult.styles'

const EmptyResult = ({ hidden }: { hidden: boolean }) => {
  return (
    <Container $hidden={hidden} data-testid='defi-empty-result'>
      <div>
        <SprinklesIcon />
        Une réponse à la question ci-dessus permet d’afficher l’impact carbone de l’achat de chaussures neuves
      </div>
    </Container>
  )
}

export default EmptyResult
