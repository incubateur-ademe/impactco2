import React from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { buildCurrentUrlFor } from 'utils/urls'
import Emoji from './Emoji'

const EquivalentIcon = ({
  equivalent,
  height,
}: {
  equivalent: Pick<ComputedEquivalent, 'slug' | 'emoji'>
  height?: number
}) => {
  return equivalent.emoji ? (
    <Emoji height={height ? `${height}rem` : undefined}>{equivalent.emoji}</Emoji>
  ) : (
    <img
      src={buildCurrentUrlFor(`/icons/${equivalent.slug}.png`)}
      width={(height || 1) * 16}
      height={(height || 1) * 16}
      alt=''
    />
  )
}

export default EquivalentIcon
