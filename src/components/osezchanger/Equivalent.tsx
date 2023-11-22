import React from 'react'
import { Equivalent as EquivalentType } from 'types/equivalent'
import habillement from '../../data/categories/habillement.json'
import numerique from '../../data/categories/numerique.json'
import repas from '../../data/categories/repas.json'
import { formatName } from 'utils/formatters'
import Emoji from 'components/base/Emoji'
import { Card, Name, Value } from './Equivalent.styles'

type Types = 'tshirt' | 'smartphone' | 'vegetarian'
const equivalents: Record<Types, EquivalentType | undefined> = {
  tshirt: habillement.find((equivalent) => equivalent.slug === 'tshirtencoton'),
  smartphone: numerique.find((equivalent) => equivalent.slug === 'smartphone'),
  vegetarian: repas.find((equivalent) => equivalent.slug === 'repasvegetarien'),
}

const Equivalent = ({ value, type }: { value: number; type: Types }) => {
  const equivalent = equivalents[type]
  if (!equivalent) {
    return null
  }

  const co2 = equivalent.total || (equivalent.ecv ? equivalent.ecv.reduce((sum, { value }) => sum + value, 0) : 0)

  return (
    <Card data-testid={`defi-equivalent-${type}`} $withShadow={!!value}>
      <Emoji height='24px'>{equivalent.emoji}</Emoji>
      <Value data-testid={`defi-equivalent-${type}-value`}>
        {(value / co2).toLocaleString('fr-fr', {
          maximumFractionDigits: 1,
          minimumFractionDigits: 0,
        })}
      </Value>
      <Name>{formatName(equivalent.name, Math.round(value / co2), true)}</Name>
    </Card>
  )
}

export default Equivalent
