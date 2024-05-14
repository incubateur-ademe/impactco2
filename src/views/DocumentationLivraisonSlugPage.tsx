'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import { RulesProviderLivraison } from 'src/providers/LivraisonProvider'

const DocumentationLivraison = dynamic(() => import('components/base/DocumentationLivraison'), {
  ssr: false,
})

const DocumentationLivraisonSlugPage = ({ slug }: { slug: string }) => {
  return (
    <RulesProviderLivraison>
      <DocumentationLivraison slug={slug} />
      <br />
      <br />
      <br />
      <br />
      <br />
    </RulesProviderLivraison>
  )
}

export default DocumentationLivraisonSlugPage
