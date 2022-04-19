import React from 'react'
import styled from 'styled-components'
import AnimatedNumber from 'animated-number-react'

import { formatNumber, formatName } from 'utils/formatters'
import Emoji from 'components/base/Emoji'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 11rem;
  margin: 1rem;
  padding: 1rem 0.25rem;
  background-color: ${(props) => props.theme.colors.secondLight};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    width: calc(50% - 0.75rem);
    margin: 0.375rem;
  }
`
const StyledEmoji = styled(Emoji)`
  margin-bottom: 0.5rem;
  font-size: 2rem;

  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
  }
`
const Title = styled.h4`
  min-height: 4.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
`
const Number = styled.span`
  display: block;
  font-size: 2rem;
  font-weight: bold;

  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
  }
`
const StyledButton = styled(Button)`
  padding: 0.375rem 1rem;
  font-size: 0.875rem;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
export default function Tile(props) {
  return (
    <Wrapper>
      <StyledEmoji>{props.equivalent.emoji}</StyledEmoji>
      <Title>
        <Number>
          <AnimatedNumber
            value={props.weight / props.equivalent.total}
            duration={500}
            formatValue={formatNumber}
          />
        </Number>{' '}
        {formatName(
          props.equivalent.name.fr,
          formatNumber(props.weight / props.equivalent.total, true)
        )}
      </Title>

      <StyledButton to={`/equivalents/${props.equivalent.slug}`}>
        Voir le détail
      </StyledButton>
    </Wrapper>
  )
}
