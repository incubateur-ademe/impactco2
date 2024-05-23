import React from 'react'
import ExamplesPage from 'src/views/ExamplesPage'
import { getCommunications, getExamples } from 'utils/examples'
import { getNotionRevalidate } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = getNotionRevalidate()

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
