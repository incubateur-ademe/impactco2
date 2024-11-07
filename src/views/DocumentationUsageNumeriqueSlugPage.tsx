'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import { UsageNumeriqueProvider } from 'src/providers/UsageNumeriqueProvider'

const DocumentationUsageNumerique = dynamic(() => import('components/base/publicode/DocumentationUsageNumerique'), {
  ssr: false,
})

const DocumentationUsageNumeriqueSlugPage = ({ slug }: { slug: string }) => {
  return (
    <UsageNumeriqueProvider>
      <DocumentationUsageNumerique slug={slug} />
    </UsageNumeriqueProvider>
  )
}

export default DocumentationUsageNumeriqueSlugPage
