import { Metadata } from 'next'
import React from 'react'
import ComparateurPage from 'components/outils/comparateur/ComparateurPage'
import { getExamples } from 'utils/examples'
import { getFAQs } from 'utils/faq'
import { getNotionRevalidate } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = getNotionRevalidate()

export const metadata: Metadata = {
  title: 'Comparateur carbone | Impact CO₂',
  description:
    'Comparer et visualiser facilement une quantité de CO₂e grâce au comparateur d’Impact CO₂ et à ses équivalents pour avoir en tête les bons ordres de grandeur.',
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/comparateur.png`,
  },
}

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
