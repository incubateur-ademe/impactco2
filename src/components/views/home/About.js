import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

import Section from 'components/base/Section'
import MagicLink from 'components/base/MagicLink'
import SimpleTile from 'components/base/SimpleTile'
import nosgestesclimat from './about/nos-gestes-climat.jpg'
import mesfruitsetlegumesdesaison from './about/mes-fruits-et-legumes-de-saison.jpg'
import quefairedemesdechets from './about/que-faire-de-mes-dechets.png'

const Title = styled.h2`
  text-align: center;
`
const Text = styled.p`
  font-size: 1.125rem;

  ${(props) => props.theme.mq.medium} {
    font-size: 1rem;
  }
`
const SimulateursTitle = styled.h3`
  padding-top: 0.25rem;
  text-align: center;
`

export default function About(props) {
  return (
    <Section>
      <Section.Content>
        <Title as={props.main ? 'h1' : 'h2'}>Qui sommes nous ?</Title>
        <Text>
          <MagicLink to='https://datagir.ademe.fr/'>
            <strong>Datagir</strong>
          </MagicLink>{' '}
          est un <strong>service public gratuit</strong>, porté par l’
          <MagicLink to='https://www.ademe.fr/'>ADEME</MagicLink> et
          l’incubateur de la DINUM{' '}
          <MagicLink to='https://beta.gouv.fr/'>beta.gouv.fr</MagicLink>.
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
        <SimulateursTitle>Découvrez nos autres simulateurs</SimulateursTitle>
        <SimpleTile.Wrapper>
          <SimpleTile
            title='Nos Gestes Climat'
            url='https://nosgestesclimat.fr'
            column={2}
          >
            <Image src={nosgestesclimat} alt='Nos Gestes Climat' />
          </SimpleTile>
          <SimpleTile
            title='Mes Fruits et Légumes de Saison'
            url='https://mesfruitsetlegumesdesaison.fr'
            column={2}
          >
            <Image
              src={mesfruitsetlegumesdesaison}
              alt='Mes Fruits et Légumes de Saison'
            />
          </SimpleTile>
          <SimpleTile
            title='Que Faire de mes Déchets'
            url='https://quefairedemesdechets.fr'
            column={2}
          >
            <Image src={quefairedemesdechets} alt='Que Faire de mes Déchets' />
          </SimpleTile>
        </SimpleTile.Wrapper>
      </Section.Content>
    </Section>
  )
}
