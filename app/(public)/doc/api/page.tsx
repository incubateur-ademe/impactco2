import { Metadata } from 'next'
import APIDocPage from 'src/views/APIDocPage'
import Suggestion from 'components/layout/Suggestion'
import { doc } from 'components/swagger/utils'
import 'swagger-ui-react/swagger-ui.css'

const pathPriority = ['/thematiques']

export const metadata: Metadata = {
  title: 'API | Impact CO₂',
  description:
    "Grâce à l'API Impact CO2 récupérer toutes les données carbones, issues des bases de données de l'ADEME et utilisées par tous les outils Impact CO2.",
}

function ApiDoc() {
  const paths: Record<string, object> = {}

  // @ts-expect-error: No ts for doc
  pathPriority.forEach((path) => (paths[path] = doc.paths[path]))
  // @ts-expect-error: No ts for doc
  const spec = { ...doc, paths: { ...paths, ...doc.paths } }
  return (
    <>
      <APIDocPage spec={spec} />
      <Suggestion fromLabel='Documentation API' simulatorName="de l'API du site" />
    </>
  )
}

export default ApiDoc
