import React from 'react'
import { Example } from 'types/example'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import AllExamples from 'components/examples/AllExamples'

const ExamplesPage = ({ examples }: { examples: Example[] }) => {
  return (
    <>
      <Breadcrumbs
        links={[
          { label: 'Accueil', link: '/' },
          { link: '/doc', label: 'La doc' },
        ]}
        current="Exemples d'utilisation"
      />
      <AllExamples examples={examples} />
    </>
  )
}

export default ExamplesPage
