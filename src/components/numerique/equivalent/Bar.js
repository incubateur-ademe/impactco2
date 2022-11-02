import React, { useContext } from 'react'
import styled from 'styled-components'

import RulesContext from '../RulesProvider'
import { formatNumber } from 'utils/formatters'
import Emoji from 'components/base/Emoji'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0.5rem 0;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: -2000rem;
    right: -2000rem;
    background-color: ${(props) => props.theme.colors.main};
  }
`
const Top = styled.div`
  position: relative;
  color: ${(props) => props.theme.colors.background};
  border-radius: 1rem 1rem 0 0;
  transition: padding 300ms ease-out, margin 300ms ease-out;
`
const Number = styled.span`
  font-size: 3.75rem;
  font-weight: bold;

  ${(props) => props.theme.mq.small} {
    font-size: 3rem;
  }
`
const Unit = styled.span`
  font-size: 1rem;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
const Big = styled.span`
  font-size: 1.25rem;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
const StyledEmoji = styled(Emoji)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.5rem;
  height: 4.5rem;
  margin-top: 0.325rem;
  font-size: 3rem;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 5.25rem;

  ${(props) => props.theme.mq.small} {
    width: 3.25rem;
    height: 3.25rem;
    font-size: 2rem;
  }
`

export default function Bar(props) {
  const { engine } = useContext(RulesContext)

  return (
    <Wrapper>
      <Top>
        <Number>{formatNumber(props.total)}</Number>{' '}
        <Unit>
          g <Big>CO2</Big>e{' '}
          {props.equivalent.unit || props.category.unit ? (
            <>/ {props.equivalent.unit || props.category.unit}</>
          ) : engine.evaluate(`${props.name} . durée`).nodeValue === 60 ? (
            '/ heure'
          ) : (
            <>/ {engine.evaluate(`${props.name} . durée`).nodeValue} minutes</>
          )}
        </Unit>
      </Top>
      <StyledEmoji>{props.equivalent.emoji}</StyledEmoji>
    </Wrapper>
  )
}
