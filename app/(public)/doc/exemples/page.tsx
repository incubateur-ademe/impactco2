import { Metadata } from 'next'
import ExamplesPage from 'src/views/ExamplesPage'
import { getCommunications, getExamples } from 'utils/examples'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = 900

export const metadata: Metadata = {
  title: "Exemples d'utilisation | Impact CO₂",
  description:
    "Retrouver tous les utilisateurs et des exemples d'intégration des outils Impact CO2 pour inspirer vos futurs contenus de sensibilisation.",
  openGraph: {
    creators: 'ADEME',
    images: `meta/exemples.png`,
  },
}

const page = async (props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const examples = await getExamples()
  const communications = await getCommunications()
  const searchParams = await props.searchParams
  const tool = decodeURI((searchParams['tool'] as string) || 'all')

  return (
    <>
      <ExamplesPage examples={examples} communications={communications} defaultTool={tool} />
      <Suggestion
        fromLabel="Exemples d'utilisation"
        from='/doc/exemples'
        simulatorName="de nos exemples d'utilisations"
      />
    </>
  )
}

export default page
