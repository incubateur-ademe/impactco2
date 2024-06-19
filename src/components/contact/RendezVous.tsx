import React from 'react'
import IframeConnect from 'components/connect/IframeConnect'
import Block from 'components/layout/Block'

const RendezVous = () => {
  return (
    <Block as='h1' title='Prendre rendez-vous' description='Besoin d’aide ou d’un accompagnement ?'>
      <IframeConnect title='Formulaire de prise de rendez-vous' src={process.env.CONNECT_IFRAME_RDV} />
    </Block>
  )
}

export default RendezVous
