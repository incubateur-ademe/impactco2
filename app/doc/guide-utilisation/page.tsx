import React from 'react'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps, getNotionRevalidate } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

const title = "Guide d'utilisation"
export const revalidate = getNotionRevalidate()

const GuideUtilisationPage = async () => {
  const recordMap = await getNotionContentProps('b9d08930a49a4346830b7a12fd7cb733')

  return (
    <>
      <Notion title={title} recordMap={recordMap} previous={{ link: '/doc', label: 'La doc' }} />
      <Suggestion from={title} fromLabel={title} simulatorName="du guide d'utilisation" />
    </>
  )
}

export default GuideUtilisationPage
