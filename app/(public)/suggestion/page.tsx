import { Metadata } from 'next'
import { Suspense } from 'react'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import SuggestionForm from 'components/contact/Suggestion'
import SuggestionBanner from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Faire une suggestion | Impact CO₂',
  description: "Partager une idée, un bug ou un avis avec l'équipe Impact CO2",
}

const SuggestionPage = () => {
  return (
    <>
      <Breadcrumbs current='Faire une suggestion' links={[{ label: 'Accueil', link: '/' }]} />
      <Suspense>
        <SuggestionForm />
      </Suspense>
      <SuggestionBanner from='/suggestion' fromLabel='Faire une suggestion' simulatorName='de ce formulaire' />
    </>
  )
}

export default SuggestionPage
