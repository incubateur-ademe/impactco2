import React from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { MEDIA } from 'utils/styles'
import Emoji from 'components/base/Emoji'
import { Section, SectionWideContent } from 'components/base/Section'

const Wrapper = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem 0;
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
const StyledEmoji = styled.div`
  align-items: center;
  background-color: var(--neutral-00);
  border-radius: 5.25rem;
  display: flex;
  font-size: 3rem;
  height: 4.5rem;
  justify-content: center;
  width: 4.5rem;

  ${MEDIA.LT.SMALL} {
    font-size: 2rem;
    height: 3.25rem;
    width: 3.25rem;
  }
`
export default function Value({ equivalent, category }: { equivalent: ComputedEquivalent; category: Category }) {
  return (
    <Wrapper>
      <Section $withoutPadding $theme='main'>
        <SectionWideContent $flex $size='sm' $center>
          <Top>
            <div>
              <Number>{equivalent.value.toLocaleString()}</Number>{' '}
              <Unit>
                kg{' '}
                <Big>
                  CO<sub>2</sub>
                </Big>
                e {(equivalent.unit || category.unit) && <>/ {equivalent.unit || category.unit}</>}
              </Unit>
            </div>
          </Top>
          <StyledEmoji>
            <Emoji>{equivalent.emoji}</Emoji>
          </StyledEmoji>
        </SectionWideContent>
      </Section>
    </Wrapper>
  )
}
