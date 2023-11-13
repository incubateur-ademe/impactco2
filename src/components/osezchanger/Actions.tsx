import React from 'react'
import Action from './Action'
import { Container, Separator } from './Actions.styles'

const Actions = () => {
  return (
    <div>
      Il est parfois difficile de prendre conscience de ce que l'on possède réellement chez soi. La phase de "comptage"
      est un incontournable pour mieux visualiser le contenu de notre penderie. Au final, avons-nous réellement besoin
      de toutes ces paires de chaussures ?<h3>2 pistes pour agir</h3>
      <Separator />
      <Container>
        <Action
          image=''
          imageAlt=''
          text='Se poser les bonnes questions avant d’acheter : en ai-je vraiment besoin ?'
          href='https://librairie.ademe.fr/cadic/1529/le-revers-de-mon-look.pdf'
        />
        <Action
          image=''
          imageAlt=''
          text='Avez-vous songé à donner une seconde vie à vos chaussures non utilisées ?'
          href='https://quefairedemesobjets.fr'
        />
      </Container>
    </div>
  )
}

export default Actions
