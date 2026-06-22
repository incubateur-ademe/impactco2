import { Metadata } from 'next'
import Outils from 'components/outils/Outils'
import { outilsJsonLd } from 'utils/jsonLd'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Outils | Impact CO₂',
  description:
    "Trouver le bon outil adapté à son contenu dans le catalogue de ressources personnalisables d'Impact CO2 pour sensibiliser à l'empreinte carbone.",
}

const OutilsPage = () => {
  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(outilsJsonLd) }} />
      <Outils />
      <Suggestion fromLabel='Outils' simulatorName='du site' />
    </>
  )
}

export default OutilsPage
