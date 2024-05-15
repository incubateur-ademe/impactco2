import { Metadata } from 'next'
import React from 'react'
import Outils from 'components/outils/Outils'
import { getFAQs } from 'utils/faq'
import { getNotionRevalidate } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Outils | Impact CO₂',
  description: 'Trouver l’outil adapté à votre prochaine publication.',
}

export const revalidate = getNotionRevalidate()

const OutilsPage = async () => {
  const faqs = await getFAQs()

  return (
    <>
      <Outils faqs={faqs} />
      <Suggestion from='/outils' fromLabel='Outils' simulatorName='du site' />
    </>
  )
}

export default OutilsPage
