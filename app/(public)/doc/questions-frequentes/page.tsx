import { Metadata } from 'next'
import React from 'react'
import FAQPage from 'src/views/FAQPage'
import { getFAQs } from 'utils/faq'
import { getNotionRevalidate } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = getNotionRevalidate()

export const metadata: Metadata = {
  title: 'Questions fréquentes | Impact CO₂',
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/faq.png`,
  },
}

const page = async () => {
  const faqs = await getFAQs()
  return (
    <>
      <FAQPage faqs={faqs} />
      <Suggestion from='/doc/questions-frequentes' fromLabel='Questions fréquentes' simulatorName='de la FAQ' />
    </>
  )
}

export default page
