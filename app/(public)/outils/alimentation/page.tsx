import { Metadata } from 'next'
import AlimentationPage from 'src/views/AlimentationPage'
import { toolsJsonLd } from 'utils/jsonLd'
import { metaDescriptions, metaTitles } from 'utils/meta'
import Suggestion from 'components/layout/Suggestion'

export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const language = (searchParams.language as string) || 'fr'
  return {
    title: `${metaTitles.alimentation[language]} | Impact CO₂`,
    description: metaDescriptions.alimentation[language],
    openGraph: {
      creators: 'ADEME',
      images: `meta/alimentation-${language}.png`,
    },
  }
}

const Alimentation = async () => {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsJsonLd.alimentation) }}
      />
      <AlimentationPage />
      <Suggestion fromLabel='Alimentation' simulatorName='de la thématique Alimentation' />
    </>
  )
}

export default Alimentation
