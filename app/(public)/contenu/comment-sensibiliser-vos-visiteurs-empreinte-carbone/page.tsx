import { Metadata } from 'next'
import React from 'react'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps, getNotionRevalidate } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = getNotionRevalidate()

const title = 'Comment sensibiliser vos visiteurs à l’empreinte carbone ?'

export const metadata: Metadata = {
  title: `${title} | Impact CO₂`,
  description:
    'Découvrez les outils ludiques et gratuits Impact CO2 pour sensibiliser vos visiteurs à l’empreinte carbone ! ',
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/sensibilisation.png`,
  },
}
const NewSite = async () => {
  const recordMap = await getNotionContentProps('d3b4b98fed4d48edadf3d950da6e6a3f')

  return (
    <>
      <Notion title={title} recordMap={recordMap} />
      <Suggestion from={title} fromLabel={title} simulatorName='des ressources de sensibilisation' />
    </>
  )
}

export default NewSite
