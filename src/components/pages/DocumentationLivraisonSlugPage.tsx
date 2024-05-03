'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import { RulesProviderLivraison } from 'components/providers/RulesProviderLivraison'

const DocumentationLivraison = dynamic(() => import('components/base/DocumentationLivraison'), {
  ssr: false,
})

const DocumentationLivraisonSlugPage = ({ slug }: { slug: string }) => {
  return (
    <RulesProviderLivraison>
      <DocumentationLivraison slug={`livraison-${slug}`} />
      <br />
      <br />
      <br />
      <br />
      <br />
    </RulesProviderLivraison>
  )
}

export default DocumentationLivraisonSlugPage
