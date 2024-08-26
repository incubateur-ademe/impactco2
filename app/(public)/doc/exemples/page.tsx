import { Metadata } from 'next'
import React from 'react'
import ExamplesPage from 'src/views/ExamplesPage'
import { getCommunications, getExamples } from 'utils/examples'
import { getRevalidate } from 'utils/revalidate'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = getRevalidate(process.env.NOTION_TABLE_REVALIDATE)

export const metadata: Metadata = {
  title: "Exemples d'utilisation | Impact CO₂",
  description:
    "Retrouver tous les utilisateurs et des exemples d'intégration des outils Impact CO2 pour inspirer vos futurs contenus de sensibilisation.",
  openGraph: {
    creators: 'ADEME',
    images: `meta/exemples.png`,
  },
}

const page = async () => {
  const examples = await getExamples()
  const communications = await getCommunications()

  return (
    <>
      <ExamplesPage examples={examples} communications={communications} />
      <Suggestion
        fromLabel="Exemples d'utilisation"
        from='/doc/exemples'
        simulatorName="de nos exemples d'utilisations"
      />
    </>
  )
}

export default page
