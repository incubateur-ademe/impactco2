import { Metadata } from 'next'
import HabillementPage from 'src/views/HabillementPage'
import { metaDescriptions, metaTitles } from 'utils/meta'
import Suggestion from 'components/layout/Suggestion'

export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const language = (searchParams.language as string) || 'fr'
  return {
    title: `${metaTitles.habillement[language]} | Impact CO₂`,
    description: metaDescriptions.habillement[language],
    openGraph: {
      creators: 'ADEME',
      images: 'meta/habillement.png',
    },
  }
}

const Habillement = async () => {
  return (
    <>
      <HabillementPage />
      <Suggestion fromLabel='Habillement' simulatorName='de la thématique Habillement' />
    </>
  )
}

export default Habillement
