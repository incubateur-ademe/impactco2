import React, { useState } from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import Button from 'components/base/Button'
import Ecv from './value/Ecv'

const StyledSection = styled(Section)`
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.main};
`
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
const StyledButton = styled(Button)`
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.main};
  background-color: ${(props) => props.theme.colors.background};

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
        <Top>
          <div>
            <Number>{props.equivalent.total}</Number>{' '}
            <Unit>
              kg <Big>CO2</Big>e
            </Unit>
          </div>
          {props.equivalent.ecv && (
            <StyledButton onClick={() => setEcvOpen((prevOpen) => !prevOpen)}>
              {ecvOpen ? 'Cacher' : 'Voir'} le détail
            </StyledButton>
          )}
        </Top>
        <Ecv open={ecvOpen} equivalent={props.equivalent} />
      </Section.Content>
    </StyledSection>
  )
}
