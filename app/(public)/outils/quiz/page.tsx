import { Metadata } from 'next'
import QuizPage from 'components/outils/quiz/QuizPage'
import { toolsJsonLd } from 'utils/jsonLd'
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
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsJsonLd.quiz) }} />
      <QuizPage />
      <Suggestion fromLabel='Quiz carbone' simulatorName='du quiz carbone' />
    </>
  )
}

export default page
