import { Metadata } from 'next'
import React from 'react'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = 900

const title = 'Le nouveau site “Impact CO2” est en ligne !'

export const metadata: Metadata = {
  title: `${title} | Impact CO₂`,
  description: 'Découvrez le nouveau site “Impact CO2” de l’ADEME !',
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/nouveau-site.png`,
  },
}
const NewSite = async () => {
  const recordMap = await getNotionContentProps('e8ea4b075afb4c0bad64894a5b7e5366')

  return (
    <>
      <Notion title={title} recordMap={recordMap} />
      <Suggestion from={title} fromLabel={title} simulatorName='du nouveau site' />
    </>
  )
}

export default NewSite
