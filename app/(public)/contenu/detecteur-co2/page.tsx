import { Metadata } from 'next'
import DetecteurPage from 'src/views/DetecteurPage'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = 900

const title = 'Le Détecteur CO₂'

export const metadata: Metadata = {
  title: `${title} | Impact CO₂`,
  description: 'Le “Détecteur CO₂” : un nouvel outil de l’ADEME pour les médias et entreprises',
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/detecteur-co2.png`,
  },
}
const Detecteur = async () => {
  const recordMap = await getNotionContentProps('51206793c21f49298672ede4bd19b7a4')

  return (
    <>
      <Notion title={title} recordMap={recordMap} />
      <Suggestion fromLabel={title} simulatorName='du Détecteur CO₂' />
      <DetecteurPage />
    </>
  )
}

export default Detecteur
