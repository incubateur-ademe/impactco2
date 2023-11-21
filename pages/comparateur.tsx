import React from 'react'
import Web from 'components/layout/Web'
import Tiles from 'components/misc/Tiles'

const Convertisseur = () => {
  return (
    <Web
      title={'Comparateur carbone'}
      description={
        'Comparer et visualiser facilement une quantité de CO2e grâce au comparateur d’Impact CO2 et à ses équivalents pour avoir en tête les bons ordres de grandeur.'
      }
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
