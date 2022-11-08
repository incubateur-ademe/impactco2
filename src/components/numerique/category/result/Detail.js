import React, { useState, useContext, useMemo } from 'react'
import styled from 'styled-components'

import { formatName, formatNumber, formatConstruction } from 'utils/formatters'
import RulesContext from 'components/numerique/RulesProvider'
import DataContext from 'components/providers/DataProvider'
import Checkbox from 'components/base/Checkbox'
import BarChart from 'components/charts/BarChart'
import Top from 'components/misc/category/Top'
import Instruction from 'components/misc/category/Instruction'

const Wrapper = styled.div`
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
`
const Title = styled.h3`
  text-align: center;
`
const Color = styled.span`
  color: ${(props) => props.theme.colors.main};
`
const Text = styled.p`
  max-width: 29rem;
  margin: 0 auto 0.5rem;
  font-size: 0.875rem;
  text-align: center;
`
export default function Detail(props) {
  const { engine, situation } = useContext(RulesContext)
  const { equivalents, categories } = useContext(DataContext)

  const [displayAll, setDisplayAll] = useState(false)
  const devicesToDisplay = useMemo(
    () =>
      [
        {
          name: 'smartphone',
          slug: 'smartphone',
        },
        {
          name: 'tablette',
          slug: 'tabletteclassique',
        },
        {
          name: 'ordinateur portable',
          slug: 'ordinateurportable',
        },
        {
          name: 'ordinateur et écran',
          slug: 'ordinateurfixe',
        },
        {
          name: 'TV',
          slug: 'television',
        },
      ].filter(
        (device) =>
          device.name === engine.evaluate('email . appareil').nodeValue ||
          device.name === engine.evaluate('streaming . appareil').nodeValue ||
          device.name === engine.evaluate('visio . appareil').nodeValue ||
          displayAll
      ),
    [situation, engine, displayAll]
  )

  const equivalentsOfCategory = useMemo(
    () =>
      [
        {
          id: `email`,
          title: `1 an d'emails (${formatNumber(
            props.numberEmails * 52
          )} emails)`,
          emoji: '📧',
          color: '#6C8CC1',
          value:
            ((engine.evaluate('email').nodeValue -
              engine.evaluate('email . terminaux . construction').nodeValue) *
              props.numberEmails *
              52) /
            1000,
          to: `/${
            categories.find((category) => category.id === 10).slug
          }/email`,
          onClick: () =>
            window?._paq?.push([
              'trackEvent',
              'Interaction',
              'Navigation via graph categorie',
              'email',
            ]),
        },
        {
          id: `visioconference`,
          title: `1 an de visoconférence (${formatNumber(
            (engine.evaluate('visio . durée').nodeValue / 60) * 52
          )} heures)`,
          emoji: '🎥',
          color: '#3DC7AB',
          value:
            (((engine.evaluate('visio . durée').nodeValue
              ? engine.evaluate('visio').nodeValue
              : 0) -
              engine.evaluate('visio . terminaux . construction').nodeValue) *
              52) /
            1000,
          to: `/${
            categories.find((category) => category.id === 10).slug
          }/visioconference`,
          onClick: () =>
            window?._paq?.push([
              'trackEvent',
              'Interaction',
              'Navigation via graph categorie',
              'visioconference',
            ]),
        },
        {
          id: `streaming`,
          title: `1 an de streaming (${formatNumber(
            (engine.evaluate('streaming . durée').nodeValue / 60) * 52
          )} heures)`,
          emoji: '🎬',
          color: '#C25166',
          value:
            (((engine.evaluate('streaming . durée').nodeValue
              ? engine.evaluate('streaming').nodeValue
              : 0) -
              engine.evaluate('streaming . terminaux . construction')
                .nodeValue) *
              52) /
            1000,
          to: `/${
            categories.find((category) => category.id === 10).slug
          }/streamingvideo`,
          onClick: () =>
            window?._paq?.push([
              'trackEvent',
              'Interaction',
              'Navigation via graph categorie',
              'streaming',
            ]),
        },
        ...equivalents
          .filter((equivalent) =>
            devicesToDisplay
              .map((device) => device.slug)
              .includes(equivalent.slug)
          )
          .map((equivalent) => ({
            id: `${equivalent.slug}`,
            title: `Construction d'un ${formatName(equivalent.name, 1)}`,
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
          })),
      ].sort((a, b) => (a.value > b.value ? 1 : -1)),
    [
      engine,
      situation,
      props.numberEmails,
      equivalents,
      categories,
      devicesToDisplay,
    ]
  )

  return (
    <Wrapper>
      <Title>
        Détail de l'impact <Color>à l'année</Color>
      </Title>
      <Text>
        En général, la majorité de votre empreinte numérique provient de la
        construction de vos appareils et pas de l’usage de ces derniers.
      </Text>
      <Top className='noscreenshot'>
        <Top.Checkboxes visible>
          <Checkbox
            name='displayAll'
            checked={displayAll}
            onChange={() => {
              setDisplayAll((prevDisplayAll) => !prevDisplayAll)
              window?._paq?.push([
                'trackEvent',
                'Interaction',
                'Voir tous les équivalents',
                props.category.name,
              ])
            }}
          >
            Voir tous les équivalents
          </Checkbox>
        </Top.Checkboxes>
      </Top>
      <BarChart
        items={equivalentsOfCategory}
        max={equivalentsOfCategory[equivalentsOfCategory.length - 1]?.value}
      />
      <Instruction />
    </Wrapper>
  )
}
