import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { formatNumber, formatTotalByMultiplier } from 'utils/formatters'
import RulesContext from 'components/numerique/RulesProvider'
import DataContext from 'components/providers/DataProvider'
import MagicLink from 'components/base/MagicLink'
import Emoji from 'components/base/Emoji'

const Wrapper = styled.p`
  margin: 0;
`
const Number = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 1;
`
const Unit = styled.span`
  font-size: 0.875rem;
  font-weight: 300;
`
const Comparaison = styled.span`
  display: block;
  font-size: 0.875rem;
  line-height: 2;
`
export default function Total(props) {
  const { engine, situation } = useContext(RulesContext)

  const { equivalents } = useContext(DataContext)
  const voiture = useMemo(
    () =>
      equivalents.find((equivalent) =>
        ['stockagedonnee'].includes(equivalent.slug)
      ),
    [equivalents]
  )

  const total = useMemo(
    () =>
      engine.evaluate('email').nodeValue * props.numberEmails +
      engine.evaluate('streaming').nodeValue +
      engine.evaluate('visio').nodeValue,
    [engine, situation, props.numberEmails]
  )
  const construction = useMemo(
    () =>
      engine.evaluate('email . terminaux . construction').nodeValue *
        props.numberEmails +
      engine.evaluate('streaming . terminaux . construction').nodeValue +
      engine.evaluate('visio . terminaux . construction').nodeValue,
    [engine, situation, props.numberEmails]
  )
  const totalToUse = useMemo(
    () => (props.construction ? total : total - construction),
    [total, props.construction]
  )

  return engine ? (
    <Wrapper>
      <Number>{formatNumber(totalToUse / 1000)}</Number>
      <Unit>
        {' '}
        kg CO<sub>2</sub>e par semaine
      </Unit>
      <Comparaison>
        (soit autant d’emission que{' '}
        <MagicLink to='/transport/voiturethermique'>
          {formatNumber(totalToUse / 1000 / formatTotalByMultiplier(voiture))}{' '}
          km en voiture <Emoji>🚗</Emoji>
        </MagicLink>
        )
      </Comparaison>
    </Wrapper>
  ) : null
}
