import { Metadata } from 'next'
import NotFoundPage from 'src/views/NotFoundPage'
import Footer from 'components/layout/Footer'
import Header from 'components/layout/Header'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Page non trouvée | Impact CO₂',
}

const NotFound = () => {
  return (
    <>
      <Header />
      <main id='contenu' role='main' tabIndex={-1}>
        <NotFoundPage />
        <Suggestion fromLabel='Page non trouvée' simulatorName='du site' />
      </main>
      <Footer />
    </>
  )
}

export default NotFound
