import { Metadata } from 'next'
import EcoConceptionPage from 'src/views/EcoConceptionPage'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Éco-conception | Impact CO₂',
}

export default function Politique() {
  return (
    <>
      <EcoConceptionPage />
      <Suggestion fromLabel='Eco-conception' simulatorName="de l'éco-conception du site" />
    </>
  )
}
