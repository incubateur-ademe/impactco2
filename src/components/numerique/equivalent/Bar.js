import { useContext } from 'react'
import styled from 'styled-components'
import formatNumber from 'utils/formatNumber'
import Emoji from 'components/base/Emoji'
import RulesContextNumerique from '../RulesProviderNumerique'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0.5rem 0;
  position: relative;

  &:before {
    background-color: ${(props) => props.theme.colors.main};
    bottom: 0;
    content: '';
    left: -2000rem;
    position: absolute;
    right: -2000rem;
    top: 0;
  }
`
const Top = styled.div`
  border-radius: 1rem 1rem 0 0;
  color: ${(props) => props.theme.colors.background};
  position: relative;
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
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 5.25rem;
  display: flex;
  font-size: 3rem;
  height: 4.5rem;
  justify-content: center;
  margin-top: 0.325rem;
  position: relative;
  width: 4.5rem;

  ${(props) => props.theme.mq.small} {
    font-size: 2rem;
    height: 3.25rem;
    width: 3.25rem;
  }
`

export default function Bar(props) {
  const { engine } = useContext(RulesContextNumerique)

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
