'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import { UsageNumeriqueProvider } from 'src/providers/UsageNumeriqueProvider'

const DocumentationUsageNumerique = dynamic(() => import('components/base/DocumentationUsageNumerique'), {
  ssr: false,
})

const DocumentationUsageNumeriqueSlugPage = ({ slug }: { slug: string }) => {
  return (
    <UsageNumeriqueProvider>
      <DocumentationUsageNumerique slug={slug} />
      <br />
      <br />
      <br />
      <br />
      <br />
    </UsageNumeriqueProvider>
  )
}

export default DocumentationUsageNumeriqueSlugPage
