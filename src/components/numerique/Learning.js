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
const Statistic = styled.h2`
  margin-bottom: 1.375rem;
  font-size: 5rem;
  font-weight: bold;
  line-height: 1;
  text-align: left;

  button {
    text-decoration: none;
  }

  ${(props) => props.theme.mq.medium} {
    font-size: 2rem;
  }
`
const Number = styled.span`
  font-size: 2.25em;
  color: ${(props) => props.theme.colors.main};
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
        <Statistic>
          <Number>2,5%</Number> des émissions de{' '}
          <ButtonLink onClick={() => setCo2e(true)}>
            CO<sub>2</sub>e
          </ButtonLink>
        </Statistic>
        <Strong>
          La{' '}
          <MagicLink to='/categories/numerique/television'>
            production d’une télé
          </MagicLink>{' '}
          émet autant de{' '}
          <ButtonLink onClick={() => setCo2e(true)}>
            CO<sub>2</sub>e
          </ButtonLink>{' '}
          que si vous alliez à Marrakech en avion, soit 350 kg de{' '}
          <ButtonLink onClick={() => setCo2e(true)}>
            CO<sub>2</sub>e
          </ButtonLink>
          .
        </Strong>
        <Text>
          Le <strong>secteur du numérique</strong> est en plein essor. En effet,
          aujourd’hui, les usages numériques font partie intégrante de notre
          quotidien. Mais saviez-vous que la{' '}
          <strong>pollution numérique</strong> a une empreinte carbone
          importante et représente jusqu’à{' '}
          <strong>
            2,5% des émissions de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            totale en France ?
          </strong>
        </Text>
        <Title>
          Réduire sa pollution numérique avec des gestes simples, c’est possible
          ?
        </Title>
        <Text>
          Pour{' '}
          <MagicLink to='https://agirpourlatransition.ademe.fr/particuliers/bureau/bons-gestes/gardons-controle-pratiques-numeriques'>
            réduire votre pollution numérique
          </MagicLink>
          , il existe de nombreux gestes à adopter ! Vous pouvez agir en
          achetant des <strong>appareils reconditionnés</strong>, éteindre vos
          appareils à la fin de chaque utilisation, limiter la très{' '}
          <strong>haute définition</strong>, ou encore
          <strong>supprimer vos mails</strong>. Et si vous faites déjà cela,
          vous pouvez refuser les objets connectés, éteindre votre box internet
          la nuit et pendant vos absences, et surtout, <strong>recycler</strong>{' '}
          vos <strong>anciens équipements informatiques</strong>. En effet, la
          plupart des matériaux contenus par les{' '}
          <strong>équipements numériques</strong> sont{' '}
          <strong>recyclables</strong> et <strong>réutilisables</strong>, et les
          autres sont dangereux pour l’environnement et pour la santé : ils
          doivent donc être traités en conséquence afin de limiter l’
          <strong>empreinte carbone du secteur numérique</strong>.
        </Text>
        <Title>
          Comment va évoluer la pollution numérique dans les prochaines années ?
        </Title>
        <Text>
          D’après une étude du{' '}
          <strong>Haut Conseil pour le climat (HCC)</strong>, le déploiement du{' '}
          <strong>réseau 5G</strong> entraînerait une augmentation de 18 à 45%
          de l’<strong>empreinte carbone du secteur numérique</strong> en France
          d’ici 2030. Quant aux objets connectés (comme les{' '}
          <MagicLink to='/categories/numerique/montreconnectee'>
            montres connectées
          </MagicLink>
          ), ils risquent de représenter 18 à 23% de l’empreinte carbone d’ici
          2025, contre 1% en 2020. Limiter son{' '}
          <strong>
            empreinte{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>
          </strong>{' '}
          due au <strong>numérique</strong>
          est donc très important : chaque geste compte !
        </Text>

        <Text>
          Si vous souhaitez aller plus loin dans votre démarche, vous pouvez
          calculer l&apos;ensemble de votre empreinte sur le climat grace à
          notre{' '}
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
