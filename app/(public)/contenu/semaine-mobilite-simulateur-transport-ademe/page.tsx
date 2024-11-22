import { Metadata } from 'next'
import React from 'react'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = 900

const title = 'Semaine européenne de la mobilité : découverte du calculateur Impact Transport de l’ADEME'

export const metadata: Metadata = {
  title: `${title} | Impact CO₂`,
  description:
    'C’est la Semaine européenne de la mobilité ! Découvrez la nouvelle version du simulateur Impact Transport porté par l’ADEME.',
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/semaine-mobilite.png`,
  },
}
const NewSite = async () => {
  const recordMap = await getNotionContentProps('fff6523d57d78091bde7c19a4a27cf40')

  return (
    <>
      <Notion title={title} recordMap={recordMap} />
      <Suggestion from={title} fromLabel={title} simulatorName='de la semaine de la mobilité' />
    </>
  )
}

export default NewSite
