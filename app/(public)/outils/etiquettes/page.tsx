import { Metadata } from 'next'
import EtiquettePage from 'src/views/EtiquettePage'
import { toolsJsonLd } from 'src/utils/jsonLd'
import { metaDescriptions, metaTitles } from 'utils/meta'
import Suggestion from 'components/layout/Suggestion'

export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const language = (searchParams.language as string) || 'fr'
  return {
    title: `${metaTitles['comparateur-etiquettes'][language]} | Impact CO₂`,
    description: metaDescriptions['comparateur-etiquettes'][language],
    openGraph: {
      creators: 'ADEME',
      images: `meta/comparateur-etiquettes-${language}.png`,
    },
  }
}

const page = () => {
  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsJsonLd.etiquettes) }} />
      <EtiquettePage />
      <Suggestion fromLabel='Étiquettes' simulatorName={`des étiquettes`} />
    </>
  )
}

export default page
