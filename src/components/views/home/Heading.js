import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'components/providers/ModalProvider'

import ButtonLink from 'components/base/ButtonLink'
import Section from 'components/base/Section'
import Search from 'components/misc/Search'

import Categories from './heading/Categories'

const StyledSectionContent = styled(Section.Content)`
  margin-bottom: 6rem;
`
const Title = styled.h1`
  color: ${(props) => props.theme.colors.main};
  letter-spacing: -0.01em;
  margin: -0.5rem 0 0.75rem;
  text-align: center;
`
const Br = styled.br`
  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
const Text = styled.p`
  font-size: 1.125rem;
  margin: 0 auto 2rem;
  text-align: center;

  ${(props) => props.theme.mq.medium} {
    font-size: 1rem;
  }
`
const StyledSearch = styled(Search)`
  font-size: 1.375rem;
  height: 3.0625rem;
  margin: 0 auto 4rem;
  width: 42rem;

  ${(props) => props.theme.mq.medium} {
    font-size: 1.25rem;
    width: 100%;
  }

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`
const StyledButtonLink = styled(ButtonLink)`
  display: block;
  margin: 0 auto;
  text-align: center;
`
export default function Heading() {
  const { setCo2e } = useContext(ModalContext)

  return (
    <Section>
      <StyledSectionContent>
        <Title>
          Découvrez l’impact sur le climat
          <Br /> des objets et gestes de votre
          <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />
          quotidien
        </Title>
        <Text>
          On parle de plus en plus de{' '}
          <ButtonLink onClick={() => setCo2e(true)}>
            CO<sub>2</sub>e
          </ButtonLink>
          , mais concrètement quelles sont les émissions nécessaires pour
          fabriquer et consommer les objets qui nous
          <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />
          entourent
          <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />?
        </Text>
        <StyledSearch placeholder={'Entrez un objet, un geste...'} home />
        <Categories />
        <StyledButtonLink onClick={() => setCo2e(true)}>
          Comprendre le CO<sub>2</sub>e
        </StyledButtonLink>
      </StyledSectionContent>
    </Section>
  )
}
