import { Metadata } from 'next'
import React from 'react'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = 900

const title = 'Quiz carbone : le nouveau jeu de cartes de l’ADEME est en ligne !'

export const metadata: Metadata = {
  title: `${title} | Impact CO₂`,
  description:
    'Quelle activité humaine a le moins d’impact sur l’environnement ? Découvrez le Quiz carbone pour y voir plus clair !',
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/quiz-carbone.png`,
  },
}
const QuizCarbone = async () => {
  const recordMap = await getNotionContentProps('1126523d57d780fb926be79164a403b8')

  return (
    <>
      <Notion title={title} recordMap={recordMap} />
      <Suggestion fromLabel={title} simulatorName='du quiz carbone' />
    </>
  )
}

export default QuizCarbone
