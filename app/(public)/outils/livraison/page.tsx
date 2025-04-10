import { Metadata } from 'next'
import LivraisonPage from 'src/views/LivraisonPage'
import { metaDescriptions, metaTitles } from 'utils/meta'
import Suggestion from 'components/layout/Suggestion'

export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const language = (searchParams.language as string) || 'fr'
  const etiquette = searchParams.etiquette === 'true'
  if (etiquette) {
    return {
      title: `${metaTitles['livraison-etiquettes'][language]} | Impact CO₂`,
      description: metaDescriptions['livraison-etiquettes'][language],
      openGraph: {
        creators: 'ADEME',
        images: `meta/livraison-etiquettes-${language}.png`,
      },
    }
  }
  return {
    title: `${metaTitles.livraison[language]} | Impact CO₂`,
    description: metaDescriptions.livraison[language],
    openGraph: {
      creators: 'ADEME',
      images: `meta/livraison-${language}.png`,
    },
  }
}

const Livraison = async () => {
  return (
    <>
      <LivraisonPage />
      <Suggestion fromLabel='Livraison' simulatorName='de la thématique Livraison' />
    </>
  )
}

export default Livraison
