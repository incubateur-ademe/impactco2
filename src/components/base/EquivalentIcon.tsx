import React from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { getComparisonSlug } from 'utils/Equivalent/equivalent'
import { buildCurrentUrlFor } from 'utils/urls'

const EquivalentIcon = ({
  equivalent,
  height,
  alt,
}: {
  equivalent: Pick<ComputedEquivalent, 'slug' | 'carpool'>
  height?: number
  alt?: string
}) => {
  const [slug] = equivalent.slug.split('+')

  return (
    <img
      src={buildCurrentUrlFor(
        `/icons/${equivalent.carpool ? 'covoiturage' : ''}${slug.endsWith('alimentation') ? slug.replace('alimentation', '') : getComparisonSlug(slug)}.svg`
      )}
      width={(height || 1) * 16}
      height={(height || 1) * 16}
      alt={alt || ''}
    />
  )
}

export default EquivalentIcon
