import React from 'react'
import Suggestion from 'components/layout/web/Suggestion'
import MentionsLegalesPage from 'components/pages/MentionsLegalesPage'

export default function MetionsLegales() {
  return (
    <>
      <MentionsLegalesPage />
      <Suggestion fromLabel='Mentions légales' from='/mentions-legales' simulatorName='des mentions légales' />
    </>
  )
}
