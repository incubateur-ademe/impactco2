import { Metadata } from 'next'
import React from 'react'
import ComparateurPage from 'components/outils/comparateur/ComparateurPage'
import { metaDescriptions, metaTitles } from 'utils/meta'
import Suggestion from 'components/layout/Suggestion'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  const language = (searchParams.language as string) || 'fr'
  return {
    title: `${metaTitles.comparateur[language]} | Impact CO₂`,
    description: metaDescriptions.comparateur[language],
    openGraph: {
      creators: 'ADEME',
      images:
        Object.entries(searchParams).length === 0
          ? 'meta/comparateur.png'
          : `${process.env.NEXT_PUBLIC_IMAGE_URL}/api/dynamics/comparateur?${Object.entries(searchParams)
              .map(([key, value]) => `${key}=${value}`)
              .join('&')}`,
    },
  }
}

const page = () => {
  return (
    <>
      <ComparateurPage />
      <Suggestion from='/outils/comparateur' fromLabel='Comparateur' simulatorName='du comparateur carbone' />
    </>
  )
}

export default page
