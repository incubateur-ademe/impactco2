import { Metadata } from 'next'
import LivraisonPage from 'src/views/LivraisonPage'
import { metaDescriptions, metaTitles } from 'utils/meta'
import Suggestion from 'components/layout/Suggestion'

export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const language = (searchParams.language as string) || 'fr'
  return {
    title: `${metaTitles.livraison[language]} | Impact CO₂`,
    description: metaDescriptions.livraison[language],
    openGraph: {
      creators: 'ADEME',
      images: 'meta/livraison.png',
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
