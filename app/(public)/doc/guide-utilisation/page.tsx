import { Metadata } from 'next'
import React from 'react'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps, getNotionRevalidate } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

const title = "Guide d'utilisation"
export const revalidate = getNotionRevalidate()
export const metadata: Metadata = {
  title: `${title} | Impact CO₂`,
  description: 'Comment utiliser les ressources Impact CO₂.',
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/guide-utilisation.png`,
  },
}

const GuideUtilisationPage = async () => {
  const recordMap = await getNotionContentProps('b9d08930a49a4346830b7a12fd7cb733')

  return (
    <>
      <Notion
        title={title}
        description="Suive le guide pour prendre en main les outils d'Impact CO₂"
        recordMap={recordMap}
        previous={{ link: '/doc', label: 'La doc' }}
      />
      <Suggestion from={title} fromLabel={title} simulatorName="du guide d'utilisation" />
    </>
  )
}

export default GuideUtilisationPage
