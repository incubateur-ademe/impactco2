import React from 'react'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps, getNotionRevalidate } from 'components/Notion/utils'
import Suggestion from 'components/layout/web/Suggestion'

const title = 'Questions fréquentes'

export const revalidate = getNotionRevalidate()

const FAQPage = async () => {
  const recordMap = await getNotionContentProps('090ceb3f28ef473d9c8e9d13b61e1332')

  return (
    <>
      <Notion title={title} recordMap={recordMap} previous={{ link: '/doc', label: 'La doc' }} />
      <Suggestion from={title} fromLabel={title} simulatorName='de la FAQ' />
    </>
  )
}

export default FAQPage
