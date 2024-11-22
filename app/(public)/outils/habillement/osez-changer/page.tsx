import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { metaDescriptions, metaTitles } from 'utils/meta'

export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const language = (searchParams.language as string) || 'fr'
  return {
    title: `${metaTitles['osez-changer'][language]} | Impact CO₂`,
    description: metaDescriptions['osez-changer'][language],
    openGraph: {
      creators: 'ADEME',
      images: `meta/osez-changer-${language}.png`,
    },
  }
}

const page = () => {
  redirect('/habillement#osez-changer')
}

export default page
