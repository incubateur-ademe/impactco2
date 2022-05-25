import React from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import MagicLink from 'components/base/MagicLink'
import Simulateur from './about/Simulateur'
import nosgestesclimat from './about/nos-gestes-climat.jpg'
import monimpacttransport from './about/mon-impact-transport.png'
import mesfruitsetlegumesdesaison from './about/mes-fruits-et-legumes-de-saison.jpg'
import quefairedemesdechets from './about/que-faire-de-mes-dechets.png'

const Title = styled.h2``
const Text = styled.p`
  font-size: 1.125rem;
`
const SimulateursTitle = styled.h3`
  padding-top: 0.25rem;
  font-size: 1.5rem;
  text-align: center;
`
const Simulateurs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;

  ${(props) => props.theme.mq.medium} {
    gap: 0.75rem;
  }
`
export default function About(props) {
  const simulateurs = [
    {
      name: 'Nos Gestes Climat',
      img: nosgestesclimat,
      url: 'https://nosgestesclimat.fr',
    },
    {
      name: 'Mon Impact Transport',
      img: monimpacttransport,
      url: 'https://monimpacttransport.fr',
    },
    {
      name: 'Mes Fruits et Légumes de Saison',
      img: mesfruitsetlegumesdesaison,
      url: 'https://mesfruitsetlegumesdesaison.fr',
    },
    {
      name: 'Que Faire de mes Déchets',
      img: quefairedemesdechets,
      url: 'https://quefairedemesdechets.fr',
    },
  ]
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
          par l'appropriation et l’intégration de ces données afin d’apporter
          l’information au plus près des citoyens.
        </Text>
        <SimulateursTitle>Découvrez nos autres simulateurs</SimulateursTitle>
        <Simulateurs>
          {simulateurs.map((simulateur) => (
            <Simulateur simulateur={simulateur} />
          ))}
        </Simulateurs>
      </Section.Content>
    </Section>
  )
}
