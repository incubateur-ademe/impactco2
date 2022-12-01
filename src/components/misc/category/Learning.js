import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'components/providers/ModalProvider'
import Section from 'components/base/Section'
import ButtonLink from 'components/base/ButtonLink'

const StyledSection = styled(Section)`
  margin: 5rem 0;
`
const Title = styled.h2``
const Strong = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  font-style: italic;

  ${(props) => props.theme.mq.medium}  {
    font-size: 1.125rem;
  }
`
const Text = styled.p``
export default function Learning(props) {
  const { setCo2e } = useContext(ModalContext)

  const repas = (
    <>
      <Title>Quel est l’impact climat d'un repas ?</Title>
      <Strong>
        Le quart des émissions de gaz à effet de serre en France provient de nos
        assiettes, c’est autant que le logement ou le transport !
      </Strong>
      <Text>
        Un repas végétarien ou végétalien (0,5 et 0,4&thinsp;kg{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>
        ) a beacoup moins d'impact pour la planète qu’un repas avec du bœuf ou
        du poulet (7&thinsp;kg{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        et 1,6&thinsp;kg{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>
        ) ou encore avec du poisson (gras 1,1&thinsp;kg{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        et blanc 2&thinsp;kg{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>
        ). Il est donc préférable de manger des produits d'origine végétale pour
        protéger l’écosystème de la planète.
      </Text>
    </>
  )

  const numerique = (
    <>
      <Title>
        Quel est l’impact sur le climat du numérique dans votre quotidien ?
      </Title>
      <Strong>
        L’empreinte carbone du secteur du numérique représente aujourd’hui 3 à
        4% des émissions de gaz à effet de serre dans le monde et 2% de
        l’empreinte carbone à l’échelle nationale.
      </Strong>
      <Text>
        La grande majorité de l'impact du numérique provient de la fabrication
        des smartphones, ordinateurs, et tous les dispositifs que nous achetons.
        Pour limiter l'impact du numérique, il est donc primordial de garder le
        plus longtemps possible nos équipements et de privilégier les appareils
        reconditionnés : tous les métaux et matériaux utilisés pour la
        fabrication repartent ainsi pour une nouvelle vie.
      </Text>
    </>
  )

  const mobilier = (
    <>
      <Title>Quel est l'impact du mobilier sur le climat ?</Title>
      <Text>
        L'impact carbone d'un meuble comprenant la fabrication, la distribution
        et l’usage, peut aller de 19&thinsp;kg d’émissions de{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        avec la chaise en bois, jusqu’à 907&thinsp;kg d’émissions de{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        avec l’armoire.
      </Text>
    </>
  )

  const habillement = (
    <>
      <Title>Quel est l’impact sur le climat d'un vêtement ?</Title>
      <Text>
        L’impact carbone d’ un habit comprenant la fabrication, la distribution
        et l’usage, peut aller de 6&thinsp;kg d’émissions de{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        pour un t-shirt en polyester, jusqu’à 99&thinsp;kg d’émissions de{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        pour un manteau.
      </Text>
    </>
  )

  const transport = (
    <>
      <Title> Quel est l’impact sur le climat du secteur du transport ?</Title>
      <Strong>
        Avec 30% des émissions de{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>
        , le secteur des transports est le 1er secteur émetteur de gaz à effet
        de serre.
      </Strong>
      <Text>
        L’impact carbone d'un déplacement d'une distance de 10km peut aller de
        0&thinsp;kg d’émission de{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        avec la marche ou le vélo, jusqu’à 2,2&thinsp;kg d’émissions de{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        avec une voiture thermique.
      </Text>
    </>
  )

  const electromenager = (
    <>
      <Title> Quel est l’impact carbone du secteur de l’électroménager ?</Title>
      <Text>
        L’impact carbone du secteur de l’électroménager comprenant la
        fabrication, la distribution et l’usage, peut aller de 41&thinsp;kg
        d’émissions de{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        avec une bouilloire, jusqu’à 513&thinsp;kg d’émissions de{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        avec le lave-linge.
      </Text>
    </>
  )

  const chauffage = (
    <>
      <Title>
        Quel est l’impact sur le climat du chauffage d'un logement ?
      </Title>
      <Text>
        Que ce soit pour une maison ou un appartement, l’impact carbone du
        chauffage domestique par m2 et par année, peut aller de 3,7&thinsp;kg
        d’émissions de{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        avec le chauffage électrique, jusqu’à 53&thinsp;kg d’émissions de{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        avec le chauffage au fioul.
      </Text>
    </>
  )

  const boisson = (
    <>
      <Title> Quel est l’impact sur le climat des boissons ?</Title>
      <Text>
        L’impact carbone des boissons peut aller de 0,0001&thinsp;kg d’émissions
        de{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        avec l’eau du robinet, comprenant l'impact de toute la gestion du réseau
        d'eau potable, jusqu’à 1,5&thinsp;kg d’émissions de{' '}
        <ButtonLink onClick={() => setCo2e(true)}>
          CO<sub>2</sub>e
        </ButtonLink>{' '}
        avec le lait de vache. Pour les boissons embouteillées, les valeurs
        affichées comprennent l'impact de leur fabrication, de l'emballage, du
        transport, de toute la chaîne distribution y compris les supermarchés.
      </Text>
    </>
  )

  const usagenumerique = (
    <>
      <Title>
        {' '}
        Quel est l’impact sur le climat des usages numériques du quotidien ?
      </Title>
      <Strong>
        L’empreinte carbone du secteur du numérique représente aujourd’hui 3 à
        4% des émissions de gaz à effet de serre dans le monde et 2% de
        l’empreinte carbone à l’échelle nationale.
      </Strong>
      <Text>
        La grande majorité de l'impact du numérique provient de la fabrication
        des smartphones, ordinateurs, et tous les dispositifs que nous achetons.
        L'impact carbone des mails va grandement varié selon la taille des
        pièces jointes et le nombre de destinataires, quand l'impact du
        streaming ou d'une visioconférence va varier selon la qualité de
        l'image. Enfin, la vidéo via 4G peut être jusqu'à 2 fois plus émétrice
        qu'avec une connexion Wifi.
      </Text>
    </>
  )

  return (
    <StyledSection>
      <Section.Content>
        {
          {
            repas,
            numerique,
            mobilier,
            habillement,
            transport,
            electromenager,
            chauffage,
            boisson,
            usagenumerique,
          }[props.category.slug]
        }
      </Section.Content>
    </StyledSection>
  )
}
