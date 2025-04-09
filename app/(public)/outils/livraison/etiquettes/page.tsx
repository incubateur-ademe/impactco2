import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { metaDescriptions, metaTitles } from 'utils/meta'

export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const language = (searchParams.language as string) || 'fr'
  return {
    title: `${metaTitles['livraison-etiquettes'][language]} | Impact CO₂`,
    description: metaDescriptions['livraison-etiquettes'][language],
    openGraph: {
      creators: 'ADEME',
      images: 'meta/livraison-etiquettes.png',
    },
  }
}

const LivraisonEtiquettes = async () => {
  redirect('/outils/livraison#etiquettes')
}

export default LivraisonEtiquettes
