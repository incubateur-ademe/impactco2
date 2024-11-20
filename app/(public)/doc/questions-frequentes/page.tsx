import { Metadata } from 'next'
import React from 'react'
import FAQPage from 'src/views/FAQPage'
import { getFAQs } from 'utils/faq'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = 900

export const metadata: Metadata = {
  title: 'Questions fréquentes | Impact CO₂',
  description:
    "Explorer la F.A.Q d'Impact CO2 pour mieux comprendre les ressources et trouver les réponses à vos questions en terme d'impact carbone.",
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
