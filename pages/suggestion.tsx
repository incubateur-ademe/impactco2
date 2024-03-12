import { useRouter } from 'next/router'
import React from 'react'
import Suggestion from 'components/contact/Suggestion'
import Web from 'components/layout/Web'

export default function SuggestionPage() {
  const router = useRouter()
  return (
    <Web
      title='Faire une suggestion'
      breadcrumb={
        router.query.from && router.query.fromLabel
          ? {
              type: 'other',
              previous: { to: router.query.from as string, label: router.query.fromLabel as string },
              current: 'Suggestion',
            }
          : {
              type: 'accueil',
              page: 'Suggestion',
            }
      }>
      <Suggestion from={router.query.fromLabel as string} simulatorName={router.query.simulatorName as string} />
    </Web>
  )
}
