import { Metadata } from 'next'
import React from 'react'
import DocumentationLivraisonPage from 'src/views/DocumentationLivraisonPage'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Documentation de la livraison | Impact CO₂',
  description: "Documentation du simulateur livraison d'Impact CO₂.",
  openGraph: {
    creators: 'ADEME',
    images: `${process.env.NEXT_PUBLIC_URL}/meta/livraison.png`,
  },
}

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
