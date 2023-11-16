import Image from 'next/image'
import React from 'react'
import Action from './Action'
import { Title } from './Actions.styles'
import { Description } from './OsezChanger.styles'

const Actions = () => {
  return (
    <>
      <Title>2 pistes pour agir</Title>
      <Image color='var(--primary-40' src='/images/separator.svg' alt='' width={36} height={20} />
      <Description>
        Prendre conscience de ce que l’on possède est une excellente première étape. Pour aller plus loin :
      </Description>
      <Action
        image='/images/osez-changer-questions.png'
        text='Se poser les bonnes questions avant d’acheter : en ai-je vraiment besoin ?'
        href='https://librairie.ademe.fr/cadic/1529/le-revers-de-mon-look.pdf'
      />
      <Action
        image='/images/osez-changer-deuxieme-vie.png'
        text='Avez-vous songé à donner une seconde vie à vos chaussures non utilisées ?'
        href='https://quefairedemesobjets.fr'
      />
    </>
  )
}

export default Actions
