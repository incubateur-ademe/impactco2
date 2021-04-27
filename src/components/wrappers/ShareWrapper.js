import React from 'react'

import Share from 'components/layout/Share'

export default function ShareWrapper(props) {
  return (
    <Share
      small={props.small}
      title='Mon Convertisseur CO2'
      message={`Visualisez facilement un poids en CO2e grâce à ce convertisseur, et découvrez quels sont les gestes climat qui comptent vraiment.`}
    />
  )
}
