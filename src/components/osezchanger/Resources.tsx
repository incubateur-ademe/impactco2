import Image from 'next/image'
import React from 'react'
import Resource from './Resource'
import { Title } from './Resources.styles'

const Resources = () => {
  return (
    <>
      <Title>Des pistes pour agir</Title>
      <Image color='var(--primary-40' src='/images/separator.svg' alt='' width={36} height={20} />
      <Resource
        image='/images/osez-changer-tri.jpeg'
        text='Faire le tri dans ses placards pour gagner de la place chez soi'
        href='https://librairie.ademe.fr/consommer-autrement/5271-comment-faire-de-la-place-chez-soi-.html'
      />
      <Resource
        image='/images/osez-changer-questions.jpg'
        text='Se poser les bonnes questions avant d’acheter : en ai-je vraiment besoin ?'
        href='https://librairie.ademe.fr/cadic/1529/le-revers-de-mon-look.pdf'
      />
      <Resource
        image='/images/osez-changer-deuxieme-vie.jpg'
        text='Donner une seconde vie aux vêtements et chaussures non utilisées'
        href='https://longuevieauxobjets.ademe.fr/'
      />
    </>
  )
}

export default Resources
