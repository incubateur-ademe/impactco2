import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import Section from 'components/base/Section'

const Title = styled.h2`
  text-align: center;
`
const Text = styled.p`
  font-size: 1.125rem;

  ${(props) => props.theme.mq.medium} {
    font-size: 1rem;
  }
`
export default function About() {
  return (
    <Section background>
      <Section.Content>
        <Title>Qui sommes nous ?</Title>
        <Text>
          <strong>Impact CO2</strong> est un{' '}
          <strong>service public gratuit</strong>, porté par l’
          <MagicLink to='https://beta.gouv.fr/startups/?incubateur=ademe'>
            accélérateur de la transition écologique
          </MagicLink>
          , l'incubateur interne de l'
          <MagicLink to='https://www.ademe.fr/'>ADEME</MagicLink>.
        </Text>
        <Text>
          Notre mission est de{' '}
          <strong>
            diffuser les informations et données environnementales en open-data
            de l’ADEME
          </strong>{' '}
          pour encourager l’amélioration continue et l’innovation. Pour cela,{' '}
          <strong>
            nous accompagnons toutes les applications & services dans leur
            démarche responsable
          </strong>{' '}
          par l&apos;appropriation et l&apos;intégration de ces données afin
          d&apos;apporter l&apos;information au plus près des citoyens.
        </Text>
        <Text>
          Une idée ? Une correction ? Une remarque ?<br />
          N'hésitez pas à nous envoyer un email à{' '}
          <MagicLink to='mailto:datagir@ademe.fr'>datagir@ademe.fr</MagicLink>
        </Text>
      </Section.Content>
    </Section>
  )
}
