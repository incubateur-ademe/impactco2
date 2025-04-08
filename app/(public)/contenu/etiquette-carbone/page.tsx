import { Metadata } from 'next'
import Notion from 'components/Notion/Notion'
import { getNotionContentProps } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = 900

const title = 'L’étiquette carbone : présentation et tutoriel d’intégration'

export const metadata: Metadata = {
  title: `${title} | Impact CO₂`,
  description: 'Découvrez les nouvelles étiquettes carbone à intégrer à vos contenus en ligne ou applications !',
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/etiquette-carbone.png`,
  },
}
const NewSite = async () => {
  const recordMap = await getNotionContentProps('6112e95efd2a4214b31b1c60e8a9de9d')

  return (
    <>
      <Notion title={title} recordMap={recordMap} />
      <Suggestion fromLabel={title} simulatorName="de l'étiquette carbone" />
    </>
  )
}

export default NewSite
