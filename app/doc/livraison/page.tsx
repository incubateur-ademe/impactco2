import React from 'react'
import DocumentationLivraisonPage from 'src/views/DocumentationLivraisonPage'
import Suggestion from 'components/layout/Suggestion'

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
