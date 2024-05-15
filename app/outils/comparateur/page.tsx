import React from 'react'
import ComparateurPage from 'components/outils/comparateur/ComparateurPage'
import { getExamples } from 'utils/examples'
import { getFAQs } from 'utils/faq'
import { getNotionRevalidate } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = getNotionRevalidate()

const page = async () => {
  const examples = await getExamples()
  const faqs = await getFAQs()
  return (
    <>
      <ComparateurPage examples={examples} faqs={faqs} />
      <Suggestion from='/outils/comparateur' fromLabel='Comparateur' simulatorName='du comparateur carbone' />
    </>
  )
}

export default page
