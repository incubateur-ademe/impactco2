import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'components/providers/ModalProvider'
import Section from 'components/base/Section'
import ButtonLink from 'components/base/ButtonLink'
import Search from 'components/misc/Search'
import Categories from './heading/Categories'

const StyledSectionContent = styled(Section.Content)`
  margin-bottom: 6rem;
`
const Title = styled.h1`
  margin: -0.5rem 0 0.75rem;
  letter-spacing: -0.01em;
  color: ${(props) => props.theme.colors.main};
  text-align: center;
`
const Br = styled.br`
  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
const Text = styled.p`
  margin: 0 auto 2rem;
  font-size: 1.125rem;
  text-align: center;

  ${(props) => props.theme.mq.medium} {
    font-size: 1rem;
  }
`
const StyledSearch = styled(Search)`
  width: 42rem;
  height: 3.0625rem;
  margin: 0 auto 4rem;
  font-size: 1.375rem;

  ${(props) => props.theme.mq.medium} {
    width: 100%;
    font-size: 1.25rem;
  }

  ${(props) => props.theme.mq.small} {
    margin-bottom: 2rem;
    font-size: 1rem;
  }
`
const StyledButtonLink = styled(ButtonLink)`
  display: block;
  margin: 0 auto;
  text-align: center;
`
export default function Heading() {
  const { setCo2e, setSurvey } = useContext(ModalContext)

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
        {/*<StyledButtonLink onClick={() => setCo2e(true)}>
          Comprendre le CO<sub>2</sub>e
        </StyledButtonLink>*/}
        <StyledButtonLink onClick={() => setSurvey(true)}>
          Répondez à notre enquête utilisateur !
        </StyledButtonLink>
      </StyledSectionContent>
    </Section>
  )
}
