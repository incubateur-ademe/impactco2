import { Metadata } from 'next'
import React from 'react'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps, getNotionRevalidate } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

const title = '4 conseils pour réduire l’impact carbone des séjours au ski'

export const metadata: Metadata = {
  title: `${title} | Impact CO₂`,
  description: "Sensibiliser le public à des pratiques durables afin de réduire l'impact écologique des séjours.",
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/impact-carbone-hiver-station-ski.png`,
  },
}

export const revalidate = getNotionRevalidate()

const SkiPage = async () => {
  const recordMap = await getNotionContentProps('519fba8721a445e3b9cb10a6fa4d5208')

  return (
    <>
      <Notion title={title} recordMap={recordMap} />
      <Suggestion from={title} fromLabel={title} simulatorName='de ce contenu' />
    </>
  )
}

export default SkiPage
