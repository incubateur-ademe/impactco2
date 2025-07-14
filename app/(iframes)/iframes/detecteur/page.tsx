import TranslationProvider from 'src/providers/TranslationProvider'
import DetecteurPage from 'src/views/DetecteurPage'
import Exemples from 'components/outils/detecteur/Exemples'

const page = () => {
  return (
    <TranslationProvider>
      <Exemples />
      <DetecteurPage />
    </TranslationProvider>
  )
}

export default page
