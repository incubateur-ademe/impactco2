import React from 'react'
import Web from 'components/layout/Web'
import Tiles from 'components/misc/Tiles'

const Convertisseur = () => {
  return (
    <Web
      title={'Comparateur carbone'}
      description={`Calculez l'équivalent de votre émission CO₂e grâce au comparateur CO2 et mesurez votre impact sur le climat`}
      breadcrumb={{
        type: 'accueil',
        page: 'Comparateur carbone',
      }}>
      <Tiles
        title={
          <>
            Visualisez facilement une quantité de CO<sub>2</sub>e
          </>
        }
      />
    </Web>
  )
}

export default Convertisseur
