import React, { useState } from 'react'
import styled from 'styled-components'

import { formatTotal, formatNumber } from 'utils/formatters'
import Section from 'components/base/Section'
import Button from 'components/base/Button'
import Ecv from './value/Ecv'

const StyledSection = styled(Section)`
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
  background-color: ${(props) => props.theme.colors.main};
`
const Top = styled.div`
  position: relative;
  margin-top: ${(props) => (props.ecvOpen ? '1rem' : 0)};
  padding: ${(props) => (props.ecvOpen ? '0 1.5rem' : 0)};
  color: ${(props) =>
    props.theme.colors[props.ecvOpen ? 'main' : 'background']};
  background-color: ${(props) =>
    props.ecvOpen ? props.theme.colors.background : 'transparent'};
  border-radius: 1rem 1rem 0 0;
  transition: padding 300ms ease-out, margin 300ms ease-out;
`
const Number = styled.span`
  font-size: 3.75rem;
  font-weight: bold;

  ${(props) => props.theme.mq.small} {
    font-size: 2rem;
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
const Including = styled.span`
  opacity: ${(props) => (props.ecvOpen ? 1 : 0)};
  transition: opacity 300ms ease-out;
`
const StyledButton = styled(Button)`
  position: absolute;
  top: ${(props) => (props.ecvOpen ? 0.5 : 1.5)}rem;
  right: 0;
  color: ${(props) => props.theme.colors.main};
  border-color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.background};
  transition: top 300ms ease-out;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }

  &:hover {
    color: ${(props) => props.theme.colors.main};
    background-color: ${(props) => props.theme.colors.background};
  }
`
export default function Value(props) {
  const [ecvOpen, setEcvOpen] = useState(false)

  return (
    <StyledSection>
      <Section.Content>
        <Top ecvOpen={ecvOpen}>
          <div>
            <Number>
              {formatNumber(formatTotal(props.equivalent), false, true)}
            </Number>{' '}
            <Unit>
              kg <Big>CO2</Big>e<Including ecvOpen={ecvOpen}> dont</Including>
            </Unit>
          </div>
          {props.equivalent.ecv && (
            <StyledButton
              onClick={() => setEcvOpen((prevOpen) => !prevOpen)}
              ecvOpen={ecvOpen}
            >
              {ecvOpen ? 'Cacher' : 'Voir'} le détail
            </StyledButton>
          )}
        </Top>
        <Ecv open={ecvOpen} equivalent={props.equivalent} />
      </Section.Content>
    </StyledSection>
  )
}
