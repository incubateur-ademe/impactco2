import React, { useContext } from 'react'
import { Category } from 'types/category'
import { Equivalent as EquivalentType } from 'types/equivalent'
import { formatName } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import {
  Emojis,
  Equals,
  Equivalent,
  Equivalents,
  Label,
  LinkWrapper,
  Small,
  StyledMagicLink,
  Title,
} from './Visualization.styles'

export const categoryLinks: Record<string, { to: string; label: string }> = {
  boisson: {
    to: '/boissons',
    label: "Comparez avec d'autres boissons",
  },
  transport: {
    to: '/transports',
    label: "Comparez avec d'autres modes de transport",
  },
  quotidien: {
    to: '/convertisseur',
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

const CenterLink = ({ category }: { category?: Category }) => {
  if (!category) {
    return null
  }

  const config = categoryLinks[category.slug]
  return (
    <LinkWrapper>
      <StyledMagicLink to={config.to} className='noscreenshot'>
        {config.label}
      </StyledMagicLink>
    </LinkWrapper>
  )
}

const getEquivalentValue = (equivalent: EquivalentType) => {
  if (equivalent.total) {
    return equivalent.total
  }

  if (equivalent.ecv) {
    return equivalent.ecv.reduce((sum, current) => sum + current.value, 0)
  }

  return 0
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

const Visualization = ({ types, base }: { types: string[]; base?: number }) => {
  const { equivalents, categories } = useContext(DataContext)

  const values = types.map(
    (slug) => equivalents.find((equivalent: EquivalentType) => equivalent.slug === slug) as EquivalentType
  )

  const factor = getEquivalentValue(values[0]) * (base || 1)
  return (
    <>
      <Title>
        En termes d&apos;émissions de CO<sub>2</sub>e
      </Title>
      <Equivalents>
        {values
          .flatMap((equivalent) => {
            const value = Math.round(factor / getEquivalentValue(equivalent))
            return [
              <Equivalent key={equivalent.slug}>
                <Emojis {...getSize(value)}>{[...Array(value)].map(() => equivalent.emoji).join('')}</Emojis>
                <Label>
                  {value} {equivalent.prefix && formatName(equivalent.prefix, value)}
                  {formatName(equivalent.name, value)} {equivalent.subtitle && formatName(equivalent.subtitle, 1)}
                </Label>
              </Equivalent>,
              <div key={`${equivalent.slug}-eq`}>
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
            const value = Math.round(factor / getEquivalentValue(equivalent))
            return [
              <div key={equivalent.slug}>
                {value} {equivalent.prefix && formatName(equivalent.prefix, value)}
                {formatName(equivalent.name, value)} {equivalent.subtitle && formatName(equivalent.subtitle, 1)}
              </div>,
              <div key={`${equivalent.slug}-eq`}>=</div>,
            ]
          })
          .slice(0, values.length * 2 - 1)}
        <br />
      </Small>
      <CenterLink category={categories.find((category) => category.id === values[0].category)} />
    </>
  )
}

export default Visualization
