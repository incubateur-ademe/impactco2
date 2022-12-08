import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { formatName, formatTotal, formatUsage } from 'utils/formatters'
import ModalContext from 'components/providers/ModalProvider'
import DataContext from 'components/providers/DataProvider'
import Section from 'components/base/Section'
import Button from 'components/base/Button'
import ButtonLink from 'components/base/ButtonLink'
import MagicLink from 'components/base/MagicLink'
import List from 'components/misc/category/List'

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
export default function LearningUsage(props) {
  const { setCo2e } = useContext(ModalContext)

  const { equivalents, categories } = useContext(DataContext)

  const equivalentsOfCategory = useMemo(
    () =>
      props.category &&
      equivalents
        .filter((equivalent) => equivalent.category === props.category.id)
        .filter((equivalent) => equivalent.default)
        .map((equivalent) => ({
          id: `${equivalent.slug}`,
          title: `${formatName(equivalent.name, 1, true)}`,
          emoji: equivalent.emoji,
          unit: equivalent.unit,
          value: formatTotal(equivalent),
          usage: formatUsage(equivalent),
          to: `/${
            categories.find((category) => category.id === equivalent.category)
              .slug
          }/${equivalent.slug}`,
          onClick: () =>
            window?._paq?.push([
              'trackEvent',
              'Interaction',
              'Navigation via graph categorie',
              equivalent.slug,
            ]),
        }))
        .sort((a, b) => (a.value > b.value ? 1 : -1)),

    [equivalents, categories, props.category]
  )

  return (
    <StyledSection>
      <Section.Content>
        <Strong>
          L’empreinte carbone du secteur du numérique représente aujourd’hui 3 à
          4<span dangerouslySetInnerHTML={{ __html: '&#8239;' }} />% des
          émissions de gaz à effet de serre dans le monde et 2
          <span dangerouslySetInnerHTML={{ __html: '&#8239;' }} />% de
          l’empreinte carbone à l’échelle nationale.
        </Strong>
        <Text>
          <strong>
            La grande majorité de l'impact du numérique provient de la
            fabrication des smartphones, ordinateurs et tous les dispositifs que
            nous achetons.{' '}
            <MagicLink to='/numerique'>
              Vous pouvez visualiser l'impact de l'ensemble des appareils sur
              notre page numérique.
            </MagicLink>
          </strong>
        </Text>
        <Text>
          L'impact des "usages" numériques est complexe à calculer et peut
          varier énormément selon les paramètres d'entrée (que ce soit du côté
          de l'utilisateur comme l'appareil utilisé ou le type de réseau
          sélectionné, etc.), ou du côté serveur (nombre de redondance des
          sauvegardes, emplacement et efficacité énergétique du data-center,
          etc.).
        </Text>
        <Text>
          Nous avons fait le choix sur cette page de n'afficher que les
          paramètres qui peuvent vraiment changer l'impact de vos usages. Les
          autres soit varient très peu, soit n'ont qu'une influence très mineure
          sur le résultat final. Vous pouvez accéder à la page de chaque usage
          si vous souhaitez aller plus loin dans la visualisation et la
          configuration de ces derniers :
        </Text>
        <List
          items={equivalentsOfCategory}
          max={equivalentsOfCategory[equivalentsOfCategory.length - 1]?.value}
        />
        <Title>
          Que puis-je faire pour réduire mon impact numérique
          <span dangerouslySetInnerHTML={{ __html: '&#8239;' }} />?
        </Title>
        <Text>
          <strong>
            L'action la plus importante pour réduire votre impact est de réduire
            le taux de renouvellement de vos appareils.
          </strong>{' '}
          Faire durer votre{' '}
          <MagicLink to='/numerique/smartphone'>smartphone</MagicLink> 4 ans au
          lieu de 2 ans diminue mécaniquement par deux votre impact total.
          Limiter le nombres d'appareils neufs est aussi efficace. La
          construction d'un{' '}
          <MagicLink to='/numerique/ordinateurportable'>
            ordinateur émet moins de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            que la construction de 2 ordinateurs
          </MagicLink>{' '}
          😉 Et vous pouvez aussi{' '}
          <strong>
            choisir d'acheter des appareils plus petits, plus adaptés à vos
            usages et souvent moins émetteurs
          </strong>
          . Vous pouvez vous référer à{' '}
          <MagicLink to='/numerique'>
            notre page numérique pour voir l'impact de la construction (et de
            l'usage moyen) de tous les appareils numériques
          </MagicLink>
          . Et si jamais la présence d'une{' '}
          <MagicLink to='/numerique/television'>télévision</MagicLink> dans la
          chambre vous est vitale, pensez au marché du reconditionné et de
          l'occasion 🙂
        </Text>
        <Text>
          Si vous souhaitez diminuer l'impact de vos usages eux même,
          normalement la visualisation plus haut devrait vous avoir donné des
          pistes : utiliser le réseau fixe (wifi ou cable) dès que possible
          plutôt que le réseau mobile (4G, 5G, etc.) est un bon réflexe.
        </Text>
        <Text>
          Diminuer la taille de l'écran de l'appareil (ou juste la résolution de
          vos vidéos) peut aussi avoir un impact conséquent, selon votre
          consommation de vidéo en streaming ou la longueur de vos échanges en
          visioconférence.
        </Text>
        <Text>
          N'oubliez pas que l'impact des emails affichés plus haut est valable
          pour des emails envoyés et lus, pas pour des emails stockés. Vous
          pouvez vous rendre sur notre{' '}
          <MagicLink to='/usagenumerique/email'>
            page spécifique à l'email
          </MagicLink>{' '}
          si vous souhaitez visualiser l'impact du stockage de votre boite
          email. En règle général, le stockage émet peu de{' '}
          <ButtonLink onClick={() => setCo2e(true)}>
            CO<sub>2</sub>e
          </ButtonLink>
          , et bien d'autres éco-gestes auront beaucoup plus d'impact.
        </Text>
        <Title>
          Et comment réduire l'ensemble de mon impact
          <span dangerouslySetInnerHTML={{ __html: '&#8239;' }} />?
        </Title>
        <Text>
          N'hésitez pas à{' '}
          <MagicLink to='/'>découvrir nos autres catégories</MagicLink> pour
          voir lesquelles sont les plus émettrices.
        </Text>
        <Text>
          Et si vous souhaitez aller plus loin et découvrir votre impact
          personnel, calculez votre empreinte sur notre simulateur{' '}
          <MagicLink to='https://nosgestesclimat.fr/'>
            Nos Gestes Climat
          </MagicLink>
        </Text>
        <Button.Wrapper>
          <Button to='https://nosgestesclimat.fr/'>
            Calculer mon empreinte carbone
          </Button>
        </Button.Wrapper>
      </Section.Content>
    </StyledSection>
  )
}
