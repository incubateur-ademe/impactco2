import TranslationProvider from 'src/providers/TranslationProvider'
import LivraisonEtiquette from 'components/outils/livraison/LivraisonEtiquette'

const page = () => {
  return (
    <TranslationProvider>
      <LivraisonEtiquette id='static' />
    </TranslationProvider>
  )
}

export default page
