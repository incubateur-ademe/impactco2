import { Metadata } from 'next'
import HabillementPage from 'src/views/HabillementPage'
import { metaDescriptions, metaTitles } from 'utils/meta'
import Suggestion from 'components/layout/Suggestion'

export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const language = (searchParams.language as string) || 'fr'
  const osezChanger = searchParams.osezchanger === 'true'
  if (osezChanger) {
    return {
      title: `${metaTitles['osez-changer'][language]} | Impact CO₂`,
      description: metaDescriptions['osez-changer'][language],
      openGraph: {
        creators: 'ADEME',
        images: `meta/osez-changer-${language}.png`,
      },
    }
  }

  return {
    title: `${metaTitles.habillement[language]} | Impact CO₂`,
    description: metaDescriptions.habillement[language],
    openGraph: {
      creators: 'ADEME',
      images: `meta/habillement-${language}.png`,
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
