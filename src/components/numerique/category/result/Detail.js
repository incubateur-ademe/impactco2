import { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import formatConstruction from 'utils/formatConstruction'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import DataContext from 'components/providers/DataProvider'
import Checkbox from 'components/base/Checkbox'
import BarChart from 'components/charts/BarChart'
import Instruction from 'components/misc/category/Instruction'
import { Checkboxes, Top } from 'components/misc/category/Top'
import RulesContextNumerique from 'components/numerique/RulesProviderNumerique'

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  padding: 1.5rem;
`
const Title = styled.h3`
  text-align: center;
`

const Text = styled.p`
  font-size: 0.875rem;
  margin: 0 auto 0.5rem;
  max-width: 29rem;
  text-align: center;
`

export default function Detail(props) {
  const { engine, situation } = useContext(RulesContextNumerique)
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
          (device.name === engine.evaluate('email . appareil').nodeValue && props.numberEmails) ||
          (device.name === engine.evaluate('streaming . appareil').nodeValue &&
            engine.evaluate('streaming . durée').nodeValue) ||
          (device.name === engine.evaluate('visio . appareil').nodeValue &&
            engine.evaluate('visio . durée').nodeValue) ||
          displayAll
      ),
    [situation, engine, displayAll, props.numberEmails]
  )

  const category = useMemo(() => categories.find((c) => c.id === 10), [categories])

  const equivalentsOfCategory = useMemo(
    () =>
      [
        {
          id: `email`,
          title: `1 an d'emails (${formatNumber(props.numberEmails * 52)} emails)`,
          emoji: '📧',
          color: '#6C8CC1',
          value:
            ((engine.evaluate('email').nodeValue - engine.evaluate('email . terminaux . construction').nodeValue) *
              props.numberEmails *
              52) /
            1000,
          to: `/${category.slug}/email`,
        },
        {
          id: `visioconference`,
          title: `1 an de visioconférence (${formatNumber(
            (engine.evaluate('visio . durée').nodeValue / 60) * 52
          )} heures)`,
          emoji: '🎥',
          color: '#3DC7AB',
          value:
            (((engine.evaluate('visio . durée').nodeValue ? engine.evaluate('visio').nodeValue : 0) -
              engine.evaluate('visio . terminaux . construction').nodeValue) *
              52) /
            1000,
          to: `/${category.slug}/visioconference`,
        },
        {
          id: `streaming`,
          title: `1 an de streaming (${formatNumber(
            (engine.evaluate('streaming . durée').nodeValue / 60) * 52
          )} heures)`,
          emoji: '🎬',
          color: '#C25166',
          value:
            (((engine.evaluate('streaming . durée').nodeValue ? engine.evaluate('streaming').nodeValue : 0) -
              engine.evaluate('streaming . terminaux . construction').nodeValue) *
              52) /
            1000,
          to: `/${category.slug}/streamingvideo`,
        },
        ...equivalents
          .filter((equivalent) => devicesToDisplay.map((device) => device.slug).includes(equivalent.slug))
          .map((equivalent) => ({
            id: `${equivalent.slug}`,
            title: `Construction d'un${
              ['tabletteclassique', 'television'].includes(equivalent.slug) ? 'e' : ''
            } ${formatName(equivalent.name, 1)}`,
            emoji: equivalent.emoji,
            unit: equivalent.unit,
            value: formatConstruction(equivalent),
            to: `/${categories.find((category) => category.id === equivalent.category).slug}/${equivalent.slug}`,
          })),
      ]
        .filter((item) => item.value)
        .sort((a, b) => (a.value > b.value ? 1 : -1)),
    [engine, situation, props.numberEmails, equivalents, categories, devicesToDisplay]
  )

  return (
    <Wrapper>
      <Title>Détail de mon impact</Title>
      <Text>
        En général, la majorité de votre empreinte numérique provient de la construction de vos appareils et pas de
        l’usage de ces derniers.
      </Text>
      <Top className='noscreenshot'>
        <Checkboxes $visible>
          <Checkbox
            name='displayAll'
            checked={displayAll}
            onChange={() => {
              setDisplayAll((prevDisplayAll) => !prevDisplayAll)
            }}>
            Voir tous les appareils
          </Checkbox>
        </Checkboxes>
      </Top>
      <BarChart items={equivalentsOfCategory} max={equivalentsOfCategory[equivalentsOfCategory.length - 1]?.value} />
      <Instruction />
    </Wrapper>
  )
}
