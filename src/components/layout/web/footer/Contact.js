import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

import Button from 'components/base/Button'
import MagicLink from 'components/base/MagicLink'
import Section from 'components/base/Section'

import simulateurs from './contact/simulateurs.png'

const StyledSection = styled(Section)`
  margin-bottom: 5rem;

  img {
    height: auto;
    margin-bottom: 0.75rem;
    width: 100%;
  }
`
const Title = styled.h2`
  text-align: center;
`
const Text = styled.p`
  font-size: 1.125rem;
  margin-bottom: 1.25rem;
  text-align: center;

  ${(props) => props.theme.mq.medium} {
    font-size: 1rem;
  }
`
const Br = styled.br`
  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
export default function Contact() {
  return (
    <StyledSection>
      <Section.Content>
        <Title>
          Intégrez nos simulateurs
          <Br /> à votre article, site ou application&thinsp;!
        </Title>
        <Image src={simulateurs} alt='Simulateurs' />
        <Text>
          Intégrez facilement nos simulateurs grace à{' '}
          <MagicLink to='/integration'>notre configurateur</MagicLink>. Que vous
          souhaitiez{' '}
          <MagicLink to='/integration?type=tuiles'>
            visualiser un poids en CO2e
          </MagicLink>
          ,{' '}
          <MagicLink to='/integration?type=transport'>
            comparer différents modes de transport
          </MagicLink>
          , ou encore découvrir{' '}
          <MagicLink to='/integration?type=usagenumerique'>
            l'impact de vos usages numériques
          </MagicLink>
          , il y a un simulateur pour vous !
        </Text>
        <Button.Wrapper>
          <Button to='/integration'>Voir le configurateur</Button>
        </Button.Wrapper>
      </Section.Content>
    </StyledSection>
  )
}
