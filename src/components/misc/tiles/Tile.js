import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AnimatedNumber from 'animated-number-react'

import Emoji from 'components/base/Emoji'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 11rem;
  margin: 1rem;
  padding: 1rem 0;
  background-color: ${(props) => props.theme.colors.secondLight};
  border-radius: 1rem;
`
const StyledEmoji = styled(Emoji)`
  margin-bottom: 0.5rem;
  font-size: 2rem;
`
const Title = styled.h4`
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
`
const StyledButton = styled(Button)`
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
`
export default function Tile(props) {
  const [total, setTotal] = useState(0)
  useEffect(() => {
    let tempTotal =
      Math.round(
        (props.currentEquivalent.total / props.equivalent.total) * 100000
      ) / 100000

    setTotal(tempTotal)
  }, [props.currentEquivalent, props.equivalent])

  return (
    <Wrapper>
      <StyledEmoji>{props.equivalent.emoji}</StyledEmoji>
      <Title>
        <Number>
          <AnimatedNumber
            value={props.currentEquivalent.total / props.equivalent.total}
            duration={500}
            formatValue={(value) => {
              let tempTotal = Math.round(value * 100000) / 100000
              tempTotal =
                tempTotal > 0.001
                  ? Math.round(tempTotal * 10000) / 10000
                  : tempTotal
              tempTotal =
                tempTotal > 0.001
                  ? Math.round(tempTotal * 1000) / 1000
                  : tempTotal
              tempTotal =
                tempTotal > 0.01 ? Math.round(tempTotal * 100) / 100 : tempTotal
              tempTotal =
                tempTotal > 0.1 ? Math.round(tempTotal * 10) / 10 : tempTotal
              tempTotal =
                tempTotal > 1 ? Math.round(tempTotal * 1) / 1 : tempTotal
              return tempTotal
            }}
          />
        </Number>{' '}
        {props.equivalent.name.fr
          .replaceAll('[s]', total > 1 ? 's' : '')
          .toLowerCase()}
      </Title>

      <StyledButton to={`/equivalents/${props.equivalent.slug}`}>
        Voir le détail
      </StyledButton>
    </Wrapper>
  )
}
