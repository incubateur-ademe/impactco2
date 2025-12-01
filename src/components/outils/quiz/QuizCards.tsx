import Image from 'next/image'
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
        <h3>Fiches du quiz</h3>
        <p>
          Si vous souhaitez proposer le Quiz Carbone dans un autre contexte, nous mettons à disposition les fiches de
          chacun des équivalents utilisés dans les questions dans un format imprimable.{' '}
        </p>
        <p>Pour obtenir les fiches, cliquez sur le bouton ci-dessous : </p>
      </div>
      <div className={outilStyles.link}>
        <Download name='fiches' />
      </div>
    </Card>
  )
}

export default QuizCards
