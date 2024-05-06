import React from 'react'
import MentionsLegalesPage from 'src/views/MentionsLegalesPage'
import Suggestion from 'components/layout/Suggestion'

export default function MetionsLegales() {
  return (
    <>
      <MentionsLegalesPage />
      <Suggestion fromLabel='Mentions légales' from='/mentions-legales' simulatorName='des mentions légales' />
    </>
  )
}
