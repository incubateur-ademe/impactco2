import Image from 'next/image'
import React from 'react'
import Card from 'components/cards/Card'
import Download from 'components/kit/Download'
import outilStyles from '../Outil.module.css'

const QuizCards = () => {
  return (
    <Card className={outilStyles.card}>
      <div className={outilStyles.image}>
        <Image src='/images/banner-quiz-cards.jpg' width={748} height={180} alt='' />
      </div>
      <div className={outilStyles.content}>
        <h2>Fiches du quiz</h2>
        <span>
          Si vous souhaitez proposer le Quiz Carbone dans un autre contexte, nous mettons à disposition les fiches de
          chacun des équivalents utilisés dans les questions dans un format imprimable.{' '}
        </span>
        <span>Pour obtenir les fiches, cliquez sur le bouton ci-dessous : </span>
      </div>
      <div className={outilStyles.link}>
        <Download name='cards' customLabel='Télécharger les fiches (.zip)' />
      </div>
    </Card>
  )
}

export default QuizCards
