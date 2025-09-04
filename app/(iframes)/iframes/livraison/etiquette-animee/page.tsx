import { TrackingProvider } from 'src/providers/TrackingProvider'
import TranslationProvider from 'src/providers/TranslationProvider'
import LivraisonEtiquette from 'components/outils/livraison/LivraisonEtiquette'

const page = () => {
  return (
    <TranslationProvider>
      <TrackingProvider tracking='Livraison etiquette'>
        <LivraisonEtiquette id='animated' animated />
      </TrackingProvider>
    </TranslationProvider>
  )
}

export default page
