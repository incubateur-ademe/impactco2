import React from 'react'
import DetecteurPage from 'src/views/DetecteurPage'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps, getNotionRevalidate } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = getNotionRevalidate()

const title = 'Le Détecteur CO₂'

const Detecteur = async () => {
  const recordMap = await getNotionContentProps('51206793c21f49298672ede4bd19b7a4')

  return (
    <>
      <Notion title={title} recordMap={recordMap} />
      <Suggestion from={title} fromLabel={title} simulatorName='du Détecteur CO₂' />
      <DetecteurPage />
    </>
  )
}

export default Detecteur
