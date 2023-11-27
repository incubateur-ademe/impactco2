import Image from 'next/image'
import React from 'react'
import { Description } from './OsezChanger.styles'
import Resource from './Resource'
import { Title } from './Resources.styles'

const Resources = () => {
  return (
    <>
      <Title>2 pistes pour agir</Title>
      <Image color='var(--primary-40' src='/images/separator.svg' alt='' width={36} height={20} />
      <Description>
        Prendre conscience de ce que l’on possède est une excellente première étape. Pour aller plus loin :
      </Description>
      <Resource
        image='/images/osez-changer-questions.jpg'
        text='Se poser les bonnes questions avant d’acheter : en ai-je vraiment besoin ?'
        href='https://librairie.ademe.fr/cadic/1529/le-revers-de-mon-look.pdf'
      />
      <Resource
        image='/images/osez-changer-deuxieme-vie.jpg'
        text='Avez-vous songé à donner une seconde vie à vos chaussures non utilisées ?'
        href='https://longuevieauxobjets.ademe.fr/'
      />
    </>
  )
}

export default Resources
