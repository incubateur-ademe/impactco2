import React from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import MagicLink from 'components/base/MagicLink'
import SimpleTile from 'components/base/SimpleTile'
import nosgestesclimat from './about/nos-gestes-climat.jpg'
import monimpacttransport from './about/mon-impact-transport.png'
import mesfruitsetlegumesdesaison from './about/mes-fruits-et-legumes-de-saison.jpg'
import quefairedemesdechets from './about/que-faire-de-mes-dechets.png'

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
      img: nosgestesclimat,
      url: 'https://nosgestesclimat.fr',
    },
    {
      title: 'Mon Impact Transport',
      img: monimpacttransport,
      url: 'https://monimpacttransport.fr',
    },
    {
      title: 'Mes Fruits et Légumes de Saison',
      img: mesfruitsetlegumesdesaison,
      url: 'https://mesfruitsetlegumesdesaison.fr',
    },
    {
      title: 'Que Faire de mes Déchets',
      img: quefairedemesdechets,
      url: 'https://quefairedemesdechets.fr',
    },
  ]
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
          {simulateurs.map((simulateur) => (
            <SimpleTile key={simulateur.url} item={simulateur} column={2} />
          ))}
        </SimpleTile.Wrapper>
      </Section.Content>
    </StyledSection>
  )
}
