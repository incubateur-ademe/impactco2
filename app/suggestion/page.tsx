import { Metadata } from 'next'
import React from 'react'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import SuggestionForm from 'components/contact/Suggestion'
import SuggestionBanner from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Faire une suggestion | Impact CO₂',
}

const SuggestionPage = () => {
  return (
    <>
      <Breadcrumbs current='Faire une suggestion' links={[{ label: 'Accueil', link: '/' }]} />
      <SuggestionForm />
      <SuggestionBanner from='/suggestion' fromLabel='Faire une suggestion' simulatorName='de ce formulaire' />
    </>
  )
}

export default SuggestionPage
