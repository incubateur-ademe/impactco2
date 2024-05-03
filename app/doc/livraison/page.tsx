import React from 'react'
import Suggestion from 'components/layout/web/Suggestion'
import DocumentationLivraisonPage from 'components/pages/DocumentationLivraisonPage'

export default function Documentation() {
  return (
    <>
      <DocumentationLivraisonPage />
      <Suggestion
        fromLabel='Documentation livraison'
        from='/doc/livraison'
        simulatorName='de la documentation sur la livraison'
      />
    </>
  )
}
