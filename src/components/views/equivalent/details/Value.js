import React from 'react'
import styled from 'styled-components'
import { computeECV } from 'utils/computeECV'
import { formatNumber } from 'utils/formatters'
import getFrenchFormattedNumber from 'utils/getFrenchFormattedNumber'
import getNumberWithNDigitsAfterComma from 'utils/getNumberWithNDigitsAfterComma'
import Emoji from 'components/base/Emoji'
import { Section, SectionWideContent } from 'components/base/Section'

const Wrapper = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem 0;
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
  width: 4.5rem;

  ${(props) => props.theme.mq.small} {
    font-size: 2rem;
    height: 3.25rem;
    width: 3.25rem;
  }
`
export default function Value(props) {
  let numberToDisplay = computeECV(props.equivalent)
  return (
    <Wrapper>
      <Section $withoutPadding $theme='main'>
        <SectionWideContent $flex $small>
          <Top>
            <div>
              <Number>
                {numberToDisplay < 0.02
                  ? formatNumber(numberToDisplay)
                  : getFrenchFormattedNumber(getNumberWithNDigitsAfterComma(numberToDisplay, 2))}
              </Number>{' '}
              <Unit>
                kg <Big>CO2</Big>e{' '}
                {(props.equivalent.unit || props.category.unit) && (
                  <>/ {props.equivalent.unit || props.category.unit}</>
                )}
              </Unit>
            </div>
          </Top>
          <StyledEmoji>{props.equivalent.emoji}</StyledEmoji>
        </SectionWideContent>
      </Section>
    </Wrapper>
  )
}
