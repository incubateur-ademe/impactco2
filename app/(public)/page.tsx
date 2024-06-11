import { Metadata } from 'next'
import React from 'react'
import { getExamples } from 'utils/examples'
import { getFAQs } from 'utils/faq'
import { getNotionRevalidate } from 'components/Notion/utils'
import Home from 'components/home/Home'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Accueil | Impact CO₂',
}

export const revalidate = getNotionRevalidate()

const HomePage = async () => {
  const examples = await getExamples()
  const faqs = await getFAQs()

  return (
    <>
      <Home examples={examples} faqs={faqs} />
      <Suggestion fromLabel='Accueil' simulatorName='du site' />
    </>
  )
}

export default HomePage
