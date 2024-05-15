import React from 'react'
import ComparateurPage from 'components/outils/comparateur/ComparateurPage'
import { getExamples } from 'utils/examples'
import { getNotionRevalidate } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = getNotionRevalidate()

const page = async () => {
  const examples = await getExamples()
  return (
    <>
      <ComparateurPage examples={examples} />
      <Suggestion from='/outils/comparateur' fromLabel='Comparateur' simulatorName='du comparateur carbone' />
    </>
  )
}

export default page
