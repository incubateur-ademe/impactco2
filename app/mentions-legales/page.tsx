import { Metadata } from 'next'
import React from 'react'
import MentionsLegalesPage from 'src/views/MentionsLegalesPage'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Mentions légales | Impact CO₂',
}

export default function MetionsLegales() {
  return (
    <>
      <MentionsLegalesPage />
      <Suggestion fromLabel='Mentions légales' from='/mentions-legales' simulatorName='des mentions légales' />
    </>
  )
}
