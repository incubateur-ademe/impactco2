import React from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import { computedEquivalents } from 'components/providers/equivalents'
import EquivalentIcon from 'components/base/EquivalentIcon'
import { Card, Name, Value } from './Equivalent.styles'

type Types = 'tshirt' | 'smartphone' | 'vegetarian'
const equivalents: Record<Types, ComputedEquivalent | undefined> = {
  tshirt: computedEquivalents.find((equivalent) => equivalent.slug === 'tshirtencoton'),
  smartphone: computedEquivalents.find((equivalent) => equivalent.slug === 'smartphone'),
  vegetarian: computedEquivalents.find((equivalent) => equivalent.slug === 'repasvegetarien'),
}

const Equivalent = ({ value, type }: { value: number; type: Types }) => {
  const equivalent = equivalents[type]
  if (!equivalent) {
    return null
  }

  return (
    <Card data-testid={`defi-equivalent-${type}`} $withShadow={!!value}>
      <EquivalentIcon height={1.5} equivalent={equivalent} />
      <Value data-testid={`defi-equivalent-${type}-value`}>
        {(value / equivalent.value).toLocaleString('fr-fr', {
          maximumFractionDigits: 1,
          minimumFractionDigits: 0,
        })}
      </Value>
      <Name>{formatName(equivalent.name, Math.round(value / equivalent.value), true)}</Name>
    </Card>
  )
}

export default Equivalent
