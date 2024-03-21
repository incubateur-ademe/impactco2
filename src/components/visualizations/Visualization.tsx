import React from 'react'
import { ComputedEquivalent, Equivalent as EquivalentType } from 'types/equivalent'
import formatName from 'utils/formatName'
import { getCategory } from 'components/providers/categories'
import { computedEquivalents } from 'components/providers/equivalents'
import Signature from 'components/screenshot/Signature'
import {
  Emojis,
  Equals,
  Equivalent,
  Equivalents,
  Label,
  LinkWrapper,
  Small,
  StyledLink,
  Title,
} from './Visualization.styles'

const categoryLinks: Record<string, { to: string; label: string }> = {
  boisson: {
    to: '/boissons',
    label: "Comparez avec d'autres boissons",
  },
  transport: {
    to: '/transport',
    label: "Comparez avec d'autres modes de transport",
  },
  quotidien: {
    to: '/comparateur',
    label: "Comparez à d'autres objets du quotidien",
  },
  habillement: {
    to: '/habillement',
    label: "Comparez à d'autres vêtements",
  },
  repas: {
    to: '/repas',
    label: "Comparez à d'autres repas",
  },
  chauffage: {
    to: '/chauffage',
    label: "Comparez avec d'autres modes de chauffage",
  },
  numerique: {
    to: '/numerique',
    label: "Comparez avec d'autres objets numériques",
  },
}

const CenterLink = ({ categoryId }: { categoryId: number }) => {
  const category = getCategory(categoryId)
  if (!category) {
    return null
  }

  const config = categoryLinks[category.slug]
  return (
    <LinkWrapper>
      <StyledLink href={config.to} className='noscreenshot'>
        {config.label}
      </StyledLink>
    </LinkWrapper>
  )
}

const getSize = (value: number) => {
  if (value > 2000) {
    return { xsmall: true }
  }

  if (value > 50) {
    return { small: true }
  }

  return {}
}

type VisualizationType = {
  category: number
  value: number
  name: string
  emoji: string
}

const Visualization = ({ types, base }: { types: (string | VisualizationType)[]; base?: number }) => {
  const values = types.map((slug) => {
    if (typeof slug === 'string') {
      const equivalent = computedEquivalents.find(
        (equivalent: EquivalentType) => equivalent.slug === slug
      ) as ComputedEquivalent
      return {
        ...equivalent,
        name: `${equivalent.prefix ? `${equivalent.prefix} ` : ''}${equivalent.name}`,
      }
    }
    return slug
  })

  const factor = values[0].value * (base || 1)
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO<sub>2</sub>e
      </Title>
      <Equivalents>
        {values
          .flatMap((equivalent) => {
            const value = Math.round(factor / equivalent.value)
            return [
              <Equivalent key={equivalent.name}>
                <Emojis {...getSize(value)}>{[...Array(value)].map(() => equivalent.emoji).join('')}</Emojis>
                <Label>
                  {value} {formatName(equivalent.name, value)}
                </Label>
              </Equivalent>,
              <div key={`${equivalent.name}-eq`}>
                <Equals>=</Equals>
                <span />
              </div>,
            ]
          })
          .slice(0, values.length * 2 - 1)}
      </Equivalents>
      <Small>
        {values
          .flatMap((equivalent) => {
            const value = Math.round(factor / equivalent.value)
            return [
              <div key={equivalent.name}>
                {value} {formatName(equivalent.name, value)}
              </div>,
              <div key={`${equivalent.name}-eq`}>=</div>,
            ]
          })
          .slice(0, values.length * 2 - 1)}
        <br />
      </Small>
      <CenterLink categoryId={values[0].category} />
      <Signature color='var(--primary-60)' small noLink noMargin />
    </>
  )
}

export default Visualization
