import React from 'react'
import FAQPage from 'src/views/FAQPage'
import { getFAQs } from 'utils/faq'
import { getNotionRevalidate } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = getNotionRevalidate()

const page = async () => {
  const faqs = await getFAQs()
  return (
    <>
      <FAQPage faqs={faqs} />
      <Suggestion from='/doc/questions-frequentes' fromLabel='Question fréquentes' simulatorName='de la FAQ' />
    </>
  )
}

export default page
