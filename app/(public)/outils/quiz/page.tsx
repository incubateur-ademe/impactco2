import { Metadata } from 'next'
import React from 'react'
import QuizPage from 'components/outils/quiz/QuizPage'
import { metaDescriptions, metaTitles } from 'utils/meta'
import Suggestion from 'components/layout/Suggestion'

export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const language = (searchParams.language as string) || 'fr'
  return {
    title: `${metaTitles.quiz[language]} | Impact CO₂`,
    description: metaDescriptions.quiz[language],
    openGraph: {
      creators: 'ADEME',
      images: 'meta/quiz.png',
    },
  }
}

const page = () => {
  return (
    <>
      <QuizPage />
      <Suggestion from='/outils/quiz' fromLabel='Quiz carbone' simulatorName='du quiz carbone' />
    </>
  )
}

export default page
