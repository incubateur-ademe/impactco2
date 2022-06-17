import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'

import Section from 'components/base/Section'
import MagicLink from 'components/base/MagicLink'
import SimpleTile from 'components/base/SimpleTile'

const StyledSection = styled(Section)`
  margin-bottom: 4rem;
`
const Title = styled.h2``
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
  const simulateurs = [
    {
      title: 'Nos Gestes Climat',
      img: './about/nos-gestes-climat.jpg',
      url: 'https://nosgestesclimat.fr',
    },
    {
      title: 'Mon Impact Transport',
      img: './about/mon-impact-transport.png',
      url: 'https://monimpacttransport.fr',
    },
    {
      title: 'Mes Fruits et Légumes de Saison',
      img: './about/mes-fruits-et-legumes-de-saison.jpg',
      url: 'https://mesfruitsetlegumesdesaison.fr',
    },
    {
      title: 'Que Faire de mes Déchets',
      img: './about/que-faire-de-mes-dechets.png',
      url: 'https://quefairedemesdechets.fr',
    },
  ]

  const img = ['./about/que-faire-de-mes-dechets.png']
  return (
    <StyledSection>
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
          par l'appropriation et l’intégration de ces données afin d’apporter
          l’information au plus près des citoyens.
        </Text>
        <SimulateursTitle>Découvrez nos autres simulateurs</SimulateursTitle>
        <SimpleTile.Wrapper>
          <SimpleTile
            title='Nos Gestes Climat'
            url='https://quefairedemesdechets.fr'
            column={2}
          >
            <StaticImage
              src='./about/nos-gestes-climat.jpg'
              alt='Nos Gestes Climat'
            />
          </SimpleTile>
          <SimpleTile
            title='Mon Impact Transport'
            url='https://quefairedemesdechets.fr'
            column={2}
          >
            <StaticImage
              src='./about/mon-impact-transport.png'
              alt='Mon Impact Transport'
            />
          </SimpleTile>
          <SimpleTile
            title='Mes Fruits et Légumes de Saison'
            url='https://quefairedemesdechets.fr'
            column={2}
          >
            <StaticImage
              src='./about/mes-fruits-et-legumes-de-saison.jpg'
              alt='Mes Fruits et Légumes de Saison'
            />
          </SimpleTile>
          <SimpleTile
            title='Que Faire de mes Déchets'
            url='https://quefairedemesdechets.fr'
            column={2}
          >
            <StaticImage
              src='./about/que-faire-de-mes-dechets.png'
              alt='Que Faire de mes Déchets'
            />
          </SimpleTile>
        </SimpleTile.Wrapper>
      </Section.Content>
    </StyledSection>
  )
}
