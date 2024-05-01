import React from 'react'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import RendezVous from 'components/contact/RendezVous'
import Suggestion from 'components/layout/web/Suggestion'

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
