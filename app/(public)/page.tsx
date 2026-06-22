import { Metadata } from 'next'
import { homeJsonLd } from 'utils/jsonLd'
import Home from 'components/home/Home'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Accueil | Impact CO₂',
}

const HomePage = () => {
  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      <Home />
      <Suggestion fromLabel='Accueil' simulatorName='du site' />
    </>
  )
}

export default HomePage
