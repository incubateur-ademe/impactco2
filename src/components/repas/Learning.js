import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'components/providers/ModalProvider'
import Section from 'components/base/Section'
import Button from 'components/base/Button'
import ButtonLink from 'components/base/ButtonLink'
import MagicLink from 'components/base/MagicLink'

const StyledSection = styled(Section)`
  margin-top: 5rem;
`
const Strong = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  font-style: italic;

  ${(props) => props.theme.mq.medium}  {
    font-size: 1.125rem;
  }
`
const Title = styled.h2``
const Text = styled.p``
export default function Learning() {
  const { setCo2e } = useContext(ModalContext)

  return (
    <StyledSection>
      <Section.Content>
        <Title>
          <MagicLink to='/categories/repas/repasavecduboeuf'>
            Produire 1kg de viande
          </MagicLink>{' '}
          émet 5 à 20 fois plus de gaz à effet de serre que produire 1kg de
          céréales.
        </Title>
        <Strong>
          70 à 80% de la déforestation provient de la production agricole.
        </Strong>
        <Text>
          Chaque <strong>repas a une empreinte carbone</strong> différente, mais
          la surconsommation de{' '}
          <MagicLink to='/categories/repas/repasavecduboeuf'>viande</MagicLink>{' '}
          a un impact considérable sur l’<strong>environnement</strong>. Elle
          est responsable d’environ{' '}
          <strong>20% des émissions de gaz à effet de serre</strong> et de
          presque <strong>80% de la déforestation</strong> dans le monde, à elle
          seule. Les océans sont également concernés car{' '}
          <strong>
            90% des stocks de{' '}
            <MagicLink to='/repas/repasavecdupoissonblanc'>poisson</MagicLink>
          </strong>{' '}
          sont surexploités ou pleinement exploités. Et tout cela alors que 1
          personne sur 3 ne mange pas à sa faim et que 30% de la nourriture est
          perdue ou gaspillée dans le monde.
        </Text>
        <Title>
          Pourquoi l’agriculture a un impact très important sur l’environnement
          ?
        </Title>
        <Text>
          La <strong>production agricole mondiale</strong> a fortement augmenté
          depuis 1960. Par exemple, l’exploitation des terres agricoles dédiées
          au <strong>soja</strong> a été multiplié par 4 sur ces 50 dernières
          années, alors qu’elles ont une forte empreinte carbone.
        </Text>
        <Title> Vous connaissez le régime flexitarien ?</Title>
        <Text>
          Le <strong>régime flexitarien</strong> consiste à choisir des produits
          de saison qualitatifs et à manger moins de viande. En effet, un repas{' '}
          <MagicLink to='/categories/repas/repasvegetarien'>
            sans viande
          </MagicLink>{' '}
          a une <strong>empreinte carbone</strong> beaucoup moins importante. Un{' '}
          <strong>flexitarien</strong> est un consommateur qui mange de tout,
          mais qui raisonne ses quantités et privilégie la qualité. Cela permet
          de couvrir ses <strong>besoins nutritionnels</strong> et aussi de{' '}
          <strong>réduire son empreinte carbone</strong> ! Mieux choisir ses
          repas, c’est diminuer son empreinte carbone. Et si vous pouvez{' '}
          <strong>manger bio</strong>, c’est encore mieux. En effet,
          l’alimentation des consommateurs se nourrissant majoritairement
          d’éléments bio émettent environ{' '}
          <strong>37% de moins de gaz à effet de serre</strong> que celle des
          consommateurs conventionnels.
        </Text>

        <Text>
          Si vous souhaitez aller plus loin dans votre démarche, vous pouvez
          calculer l’ensemble de votre empreinte sur le climat grace à notre{' '}
          <MagicLink to={'https://nosgestesclimat.fr/'}>
            simulateur Nos Gestes Climat
          </MagicLink>
        </Text>
        <Button.Wrapper>
          <Button to={'https://nosgestesclimat.fr/'}>
            Découvrir Nos Gestes Climat
          </Button>
        </Button.Wrapper>
      </Section.Content>
    </StyledSection>
  )
}
