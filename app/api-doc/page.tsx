import React from 'react'
import APIDocPage from 'src/views/APIDocPage'
import 'swagger-ui-react/swagger-ui.css'
import Suggestion from 'components/layout/Suggestion'
import { doc } from 'components/swagger/utils'

const pathPriority = ['/thematiques']

function ApiDoc() {
  const paths: Record<string, object> = {}

  // @ts-expect-error: No ts for doc
  pathPriority.forEach((path) => (paths[path] = doc.paths[path]))
  // @ts-expect-error: No ts for doc
  const spec = { ...doc, paths: { ...paths, ...doc.paths } }
  return (
    <>
      <APIDocPage spec={spec} />
      <Suggestion fromLabel='Documentation API' from='/api-doc' simulatorName="de l'API du site" />
    </>
  )
}

export default ApiDoc
