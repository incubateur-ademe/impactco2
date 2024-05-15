import React from 'react'
import ExamplesPage from 'src/views/ExamplesPage'
import { getExamples } from 'utils/examples'
import { getNotionRevalidate } from 'components/Notion/utils'
import Suggestion from 'components/layout/Suggestion'

export const revalidate = getNotionRevalidate()

const page = async () => {
  const examples = await getExamples()
  return (
    <>
      <ExamplesPage examples={examples} />
      <Suggestion
        fromLabel="Exemples d'utilisation"
        from='/doc/exemples'
        simulatorName="de nos exemples d'utilisations"
      />
    </>
  )
}

export default page
