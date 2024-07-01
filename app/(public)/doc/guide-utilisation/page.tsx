import { Metadata } from 'next'
import React from 'react'
import { getGuideUtilisation } from 'utils/guideUtilisation'
import { getNotionRevalidate } from 'components/Notion/utils'
import GuideUtilisation from 'components/faq/GuideUtilisation'
import Suggestion from 'components/layout/Suggestion'

const title = "Guide d'utilisation"

export const revalidate = getNotionRevalidate()

export const metadata: Metadata = {
  title: `${title} | Impact CO₂`,
  description:
    "Découvrir comment utiliser les ressources d’Impact CO₂ et s'en emparer facilement, en tout autonomie, pour les diffuser à sa communauté.",
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/guide-utilisation.png`,
  },
}

const GuideUtilisationPage = async () => {
  const rows = await getGuideUtilisation()

  return (
    <>
      <GuideUtilisation rows={rows} />
      <Suggestion from={title} fromLabel={title} simulatorName="du guide d'utilisation" />
    </>
  )
}

export default GuideUtilisationPage
