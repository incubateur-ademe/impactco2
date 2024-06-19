import React from 'react'
import IframeConnect from 'components/connect/IframeConnect'

const Email = () => {
  return <IframeConnect title='Laisser votre email' src={process.env.CONNECT_IFRAME_HOME} />
}

export default Email
