import React from 'react'
import IframeConnect from 'components/connect/IframeConnect'

const Email = () => {
  return (
    <IframeConnect title='Formulaire de prise de contact pour un rendez-vous' src={process.env.CONNECT_IFRAME_HOME} />
  )
}

export default Email
