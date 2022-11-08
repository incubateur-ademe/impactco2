import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { formatName, formatConstruction } from 'utils/formatters'
import RulesContext from 'components/numerique/RulesProvider'
import DataContext from 'components/providers/DataProvider'
import BarChart from 'components/charts/BarChart'

const Wrapper = styled.div`
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
`
const Title = styled.h3`
  text-align: center;
`
const Text = styled.p`
  max-width: 24rem;
  margin: 0 auto 0.5rem;
  font-size: 0.875rem;
  text-align: center;
`
export default function Detail() {
  const { equivalents, categories } = useContext(DataContext)
  const equivalentsOfCategory = useMemo(
    () =>
      equivalents
        .filter((equivalent) =>
          [
            'smartphone',
            'tabletteclassique',
            'ordinateurportable',
            'ordinateurfixe',
            'television',
          ].includes(equivalent.slug)
        )
        .map((equivalent) => ({
          id: `${equivalent.slug}`,
          title: `${formatName(equivalent.name, 1, true)}`,
          emoji: equivalent.emoji,
          unit: equivalent.unit,
          value: formatConstruction(equivalent),
          to: `/${
            categories.find((category) => category.id === equivalent.category)
              .slug
          }/${equivalent.slug}`,
          onClick: () =>
            window?._paq?.push([
              'trackEvent',
              'Interaction',
              'Navigation via graph categorie',
              equivalent.slug,
            ]),
        }))
        .sort((a, b) => (a.value > b.value ? 1 : -1)),

    [equivalents, categories]
  )

  return (
    <Wrapper>
      <Title>Détail de l'impact</Title>
      <Text>
        En général, la majorité de votre empreinte numérique provient de la
        construction de vos appareils et pas de l’usage de ces derniers.
      </Text>
      <BarChart
        items={equivalentsOfCategory}
        max={equivalentsOfCategory[equivalentsOfCategory.length - 1]?.value}
      />
    </Wrapper>
  )
}
