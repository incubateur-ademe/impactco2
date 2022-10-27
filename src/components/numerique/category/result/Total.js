import React, { useContext } from 'react'
import styled from 'styled-components'

import { formatNumber } from 'utils/formatters'
import RulesContext from 'components/numerique/RulesProvider'

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
  const { engine } = useContext(RulesContext)

  return engine ? (
    <Wrapper>
      <Number>
        {formatNumber(
          (engine.evaluate('email').nodeValue * props.numberEmails +
            engine.evaluate('streaming').nodeValue +
            engine.evaluate('visio').nodeValue) /
            1000
        )}
      </Number>
      <Unit>
        {' '}
        kg CO<sub>2</sub>e par semaine
      </Unit>
      <Comparaison>
        (soit autant d’emission que 10 km en voiture 🚗)
      </Comparaison>
    </Wrapper>
  ) : null
}
