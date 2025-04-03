import { Metadata } from 'next'
import PolitiquePage from 'src/views/PolitiquePage'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Politique de confidentialité | Impact CO₂',
}

export default function Politique() {
  return (
    <>
      <PolitiquePage />
      <Suggestion fromLabel='Politique de confidentialité' simulatorName='de la politique de confidentialité' />
    </>
  )
}
