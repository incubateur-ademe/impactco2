import { Metadata } from 'next'
import ImpactMatrixPage from 'src/views/ImpactMatrixPage'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: "Matrice d'impact | Impact CO₂",
}

export default async function MatriceImpactPage() {
  return (
    <>
      <ImpactMatrixPage />
      <Suggestion fromLabel="Matrice d'impact" simulatorName="de notre matrice d'impact" />
    </>
  )
}
