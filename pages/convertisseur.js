import React from 'react'

import Web from 'components/layout/Web'
import Tiles from 'components/misc/Tiles'

export default function Convertisseur() {
  return (
    <Web
      title={'Votre équivalent CO₂e ou CO₂e'}
      description={`Calculez l'équivalent de votre émission CO₂e grâce au convertisseur CO2 Datagir et mesurez votre impact sur le climat`}
    >
      <Tiles />
    </Web>
  )
}
