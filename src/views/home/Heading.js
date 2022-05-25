import React from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import Search from 'components/misc/Search'
import Categories from './heading/Categories'

const StyledSectionContent = styled(Section.Content)`
  margin-bottom: 6rem;
`
const Title = styled.h1`
  margin: -0.5rem 0 0.75rem;
  font-size: 2.25rem;
  letter-spacing: -0.01em;
  color: ${(props) => props.theme.colors.main};
  text-align: center;
`
const Text = styled.p`
  width: 42rem;
  margin: 0 auto 2.5rem;
  text-align: center;
`
const StyledSearch = styled(Search)`
  width: 42rem;
  height: 3.0625rem;
  margin: 0 auto 3rem;
  font-size: 1.375rem;
`
export default function Heading() {
  return (
    <Section>
      <StyledSectionContent>
        <Title>
          Découvrez l’impact sur le climat
          <br />
          des objets et gestes de votre quotidien
        </Title>
        <Text>
          On parle de plus en plus de CO2e, mais concrètement quelles sont les
          émissions nécessaires pour fabriquer et consommer les objets qui nous
          entourent ?
        </Text>
        <StyledSearch placeholder={'Entrez un objet, un geste...'} />
        <Categories />
      </StyledSectionContent>
    </Section>
  )
}
