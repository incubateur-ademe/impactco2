'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import { LivraisonProvider } from 'src/providers/LivraisonProvider'

const DocumentationLivraison = dynamic(() => import('components/base/publicode/DocumentationLivraison'), {
  ssr: false,
})

const DocumentationLivraisonSlugPage = ({ slug }: { slug: string }) => {
  return (
    <LivraisonProvider>
      <DocumentationLivraison slug={slug} />
    </LivraisonProvider>
  )
}

export default DocumentationLivraisonSlugPage
