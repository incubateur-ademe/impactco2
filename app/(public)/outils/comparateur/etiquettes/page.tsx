import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { metaDescriptions, metaTitles } from 'utils/meta'

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
      images: 'meta/comparateur-etiquettes.png',
    },
  }
}

const ComparateurEtiquettes = async () => {
  redirect('/outils/comparateur#etiquettes')
}

export default ComparateurEtiquettes
