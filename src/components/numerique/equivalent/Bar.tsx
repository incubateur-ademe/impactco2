import Engine from 'publicodes'
import styled from 'styled-components'
import { Category as CategoryType } from 'types/category'
import { Equivalent as EquivalentType } from 'types/equivalent'
import formatNumber from 'utils/formatNumber'
import { MEDIA } from 'utils/styles'
import Emoji from 'components/base/Emoji'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0.5rem 0;
  position: relative;

  &:before {
    background-color: var(--primary-50);
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
  color: var(--neutral-00);
  position: relative;
`
const Number = styled.span`
  font-size: 3.75rem;
  font-weight: bold;

  ${MEDIA.LT.SMALL} {
    font-size: 3rem;
  }
`
const Unit = styled.span`
  font-size: 1rem;

  ${MEDIA.LT.SMALL} {
    font-size: 0.75rem;
  }
`
const Big = styled.span`
  font-size: 1.25rem;

  ${MEDIA.LT.SMALL} {
    font-size: 1rem;
  }
`
const StyledEmoji = styled(Emoji)`
  align-items: center;
  background-color: var(--neutral-00);
  border-radius: 5.25rem;
  display: flex;
  font-size: 3rem;
  height: 4.5rem;
  justify-content: center;
  margin-top: 0.325rem;
  position: relative;
  width: 4.5rem;

  ${MEDIA.LT.SMALL} {
    font-size: 2rem;
    height: 3.25rem;
    width: 3.25rem;
  }
`

export default function Bar({
  category,
  equivalent,
  engine,
  name,
  total,
}: {
  category: CategoryType
  equivalent: EquivalentType
  engine: Engine
  name: string
  total: number
}) {
  return (
    <Wrapper>
      <Top>
        <Number>{formatNumber(total)}</Number>{' '}
        <Unit>
          g{' '}
          <Big>
            CO<sub>2</sub>
          </Big>
          e{' '}
          {equivalent.unit || category.unit ? (
            <>/ {equivalent.unit || category.unit}</>
          ) : engine.evaluate(`${name} . durée`).nodeValue === 60 ? (
            '/ heure'
          ) : (
            <>/ {engine.evaluate(`${name} . durée`).nodeValue} minutes</>
          )}
        </Unit>
      </Top>
      <StyledEmoji>{equivalent.emoji}</StyledEmoji>
    </Wrapper>
  )
}
