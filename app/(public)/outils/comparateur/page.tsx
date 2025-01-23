import { Metadata } from 'next'
import ComparateurPage from 'components/outils/comparateur/ComparateurPage'
import { metaDescriptions, metaTitles } from 'utils/meta'
import { getDefaultParams } from 'utils/params'
import Suggestion from 'components/layout/Suggestion'

export const dynamic = 'force-dynamic'

export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const language = (searchParams.language as string) || 'fr'
  return {
    title: `${metaTitles.comparateur[language]} | Impact CO₂`,
    description: metaDescriptions.comparateur[language],
    openGraph: {
      creators: 'ADEME',
      images:
        Object.entries(searchParams).length === 0
          ? `meta/comparateur-${language}.png`
          : `${process.env.NEXT_PUBLIC_IMAGE_URL}/api/dynamics/comparateur?${Object.entries(searchParams)
              .map(([key, value]) => `${key}=${value}`)
              .join('&')}`,
    },
  }
}

const page = async (props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const defaultParams = getDefaultParams(await props.searchParams)
  return (
    <>
      <ComparateurPage defaultParams={defaultParams.comparateur} />
      <Suggestion from='/outils/comparateur' fromLabel='Comparateur' simulatorName='du comparateur carbone' />
    </>
  )
}

export default page
