import { Metadata } from 'next'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import SuggestionForm from 'components/contact/Suggestion'
import FooterBanner from 'components/layout/FooterBanner'

export const metadata: Metadata = {
  title: 'Faire une suggestion | Impact CO₂',
  description: "Partager une idée, un bug ou un avis avec l'équipe Impact CO2",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

const SuggestionPage = () => {
  return (
    <>
      <Breadcrumbs current='Faire une suggestion' links={[{ label: 'Accueil', link: '/' }]} />
      <SuggestionForm />
      <FooterBanner />
    </>
  )
}

export default SuggestionPage
