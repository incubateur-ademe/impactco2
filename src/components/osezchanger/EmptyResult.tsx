import React from 'react'
import { Container } from './EmptyResult.styles'
import { Icon } from './icons'

const EmptyResult = ({ hidden }: { hidden: boolean }) => {
  return (
    <Container $hidden={hidden} data-testid='defi-empty-result'>
      <div>
        <Icon iconId='sprinkles' />
        Une réponse à la question ci-dessus permet d’afficher l’impact carbone de l’achat de chaussures neuves
      </div>
    </Container>
  )
}

export default EmptyResult
