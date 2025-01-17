import { Example } from 'types/example'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import AllExamples from 'components/examples/AllExamples'

const ExamplesPage = ({
  examples,
  communications,
  defaultTool,
}: {
  examples: Example[]
  communications: Example[]
  defaultTool: string
}) => {
  return (
    <>
      <Breadcrumbs
        links={[
          { label: 'Accueil', link: '/' },
          { link: '/doc', label: 'La doc' },
        ]}
        current="Exemples d'utilisation"
      />
      <AllExamples examples={examples} communications={communications} defaultTool={defaultTool} />
    </>
  )
}

export default ExamplesPage
