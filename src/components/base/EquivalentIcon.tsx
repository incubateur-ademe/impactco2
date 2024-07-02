import React from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { buildCurrentUrlFor } from 'utils/urls'

const EquivalentIcon = ({
  equivalent,
  height,
}: {
  equivalent: Pick<ComputedEquivalent, 'slug' | 'carpool'>
  height?: number
}) => {
  return (
    <img
      src={buildCurrentUrlFor(
        `/icons/${equivalent.carpool ? 'covoiturage' : ''}${equivalent.slug.endsWith('courrier') ? 'avion' : equivalent.slug}.svg`
      )}
      width={(height || 1) * 16}
      height={(height || 1) * 16}
      alt=''
    />
  )
}

export default EquivalentIcon
