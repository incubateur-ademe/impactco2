import React from 'react'
import { Equivalent as EquivalentType } from 'types/equivalent'
import habillement from '../../data/categories/habillement.json'
import numerique from '../../data/categories/numerique.json'
import repas from '../../data/categories/repas.json'
import { formatName } from 'utils/formatters'
import Emoji from 'components/base/Emoji'

type Types = 'tshirt' | 'smartphone' | 'vegetarian'
const equivalents: Record<Types, { values: EquivalentType | undefined; label: string }> = {
  tshirt: {
    values: habillement.find((equivalent) => equivalent.slug === 'tshirtencoton'),
    label: 'Tshirt[s]',
  },
  smartphone: {
    values: numerique.find((equivalent) => equivalent.slug === 'smartphone'),
    label: 'Smartphone[s]',
  },
  vegetarian: {
    values: repas.find((equivalent) => equivalent.slug === 'repasvegetarien'),
    label: 'Repas végétarien[s]',
  },
}

const Equivalent = ({ value, type }: { value: number; type: Types }) => {
  const equivalent = equivalents[type]
  if (!equivalent.values) {
    return null
  }

  const co2 =
    equivalent.values.total ||
    (equivalent.values.ecv ? equivalent.values.ecv.reduce((sum, { value }) => sum + value, 0) : 0)

  console.log(equivalent.values)
  return (
    <div>
      <Emoji>{equivalent.values.emoji}</Emoji>
      {Math.round(value / co2)} {formatName(equivalent.label, Math.round(value / co2))}
    </div>
  )
}

export default Equivalent
