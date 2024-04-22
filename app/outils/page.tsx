import { Metadata } from 'next'
import React from 'react'
import Outils from 'components/outils/Outils'
import Suggestion from 'components/layout/web/Suggestion'

export const metadata: Metadata = {
  title: 'Outils | Impact CO₂',
  description: 'Trouver l’outil adapté à votre prochaine publication.',
}

const OutilsPage = () => {
  return (
    <>
      <Outils />
      <Suggestion from='/outils' fromLabel='Outils' simulatorName='du site' />
    </>
  )
}

export default OutilsPage
