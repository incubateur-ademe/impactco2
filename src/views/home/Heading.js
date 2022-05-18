import React from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import Button from '../../components/base/Button'

const StyledSectionContent = styled(Section.Content)`
  margin-bottom: 5rem;
`
const Title = styled.h1`
  margin-bottom: 0.75rem;
  font-size: 2.25rem;
  letter-spacing: -0.01em;
  color: ${(props) => props.theme.colors.main};
  text-align: center;
`
const Text = styled.p`
  margin-bottom: 1.25rem;
  text-align: center;
`
export default function Heading() {
  return (
    <Section>
      <StyledSectionContent>
        <Title>
          Découvrez l’impact sur le climat des objets et gestes de votre
          quotidien
        </Title>
        <Text>
          On parle de plus en plus de CO2e, mais concrètement quelles sont les
          émissions nécessaires pour fabriquer et consommer les objets qui nous
          entourent ?
        </Text>
        <Button.Wrapper>
          <Button to='/categories'>Voir les catégories</Button>
          <Button onClick={() => alert('Bientôt disponible')} hollow>
            Comprendre le CO2e
          </Button>
        </Button.Wrapper>
      </StyledSectionContent>
    </Section>
  )
}
