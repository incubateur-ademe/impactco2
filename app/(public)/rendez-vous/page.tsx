import { Metadata } from 'next'
import React from 'react'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import RendezVous from 'components/contact/RendezVous'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Prendre rendez-vous | Impact CO₂',
  description:
    "Besoin d'aide ou d'accompagnement dans vos projets de sensibilisation ? Prendre rendez-vous avec l'équipe Impact CO2",
}

const RDVPage = () => {
  return (
    <>
      <Breadcrumbs current='Prendre rendez-vous' links={[{ label: 'Accueil', link: '/' }]} />
      <RendezVous />
      <Suggestion from='/rendez-vous' fromLabel='Prendre Rendez-vous' simulatorName='de la prise de rendez-vous' />
    </>
  )
}

export default RDVPage
