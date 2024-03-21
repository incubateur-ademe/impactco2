import React, { useState } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import { Section, SectionWideContent } from 'components/base/Section'
import Button from 'components/base/buttons/Button'
import Link from 'components/base/buttons/Link'
import Co2eModal from 'components/modals/Co2eModal'

const StyledSection = styled(Section)`
  margin-top: 5rem;
`
const Statistic = styled.h2`
  font-size: 5rem;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 1.375rem;
  text-align: left;

  button {
    text-decoration: none;
  }

  ${MEDIA.LT.MEDIUM} {
    font-size: 2rem;
  }
`
const Number = styled.span`
  color: var(--primary-50);
  font-size: 2.25em;
`
const Strong = styled.p`
  font-size: 1.5rem;
  font-style: italic;
  font-weight: bold;

  ${MEDIA.LT.MEDIUM}  {
    font-size: 1.125rem;
  }
`
const Title = styled.h2``
const Text = styled.p``
export default function Learning() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <StyledSection>
      {openModal && <Co2eModal setOpen={setOpenModal} />}
      <SectionWideContent>
        <Statistic>
          <Number>2,5%</Number> des émissions de{' '}
          <Button asLink onClick={() => setOpenModal(true)}>
            CO<sub>2</sub>e
          </Button>
        </Statistic>
        <Strong>
          La <Link href='/numerique/television'>production d’une télé</Link> émet autant de{' '}
          <Button asLink onClick={() => setOpenModal(true)}>
            CO<sub>2</sub>e
          </Button>{' '}
          que si vous alliez à Marrakech en avion, soit 350 kg de{' '}
          <Button asLink onClick={() => setOpenModal(true)}>
            CO<sub>2</sub>e
          </Button>
          .
        </Strong>
        <Text>
          Le <strong>secteur du numérique</strong> est en plein essor. En effet, aujourd’hui, les appareils numériques
          et leurs usages font partie intégrante de notre quotidien. Mais saviez-vous que le <strong>numérique</strong>{' '}
          représente jusqu’à{' '}
          <strong>
            2,5% des émissions de{' '}
            <Button asLink onClick={() => setOpenModal(true)}>
              CO<sub>2</sub>e
            </Button>{' '}
            totale en France ?
          </strong>
        </Text>
        <Title>Réduire son impact numérique avec des gestes simples, c’est possible ?</Title>
        <Text>
          Pour{' '}
          <Link href='https://agirpourlatransition.ademe.fr/particuliers/bureau/bons-gestes/gardons-controle-pratiques-numeriques'>
            réduire notre impact numérique
          </Link>
          , il existe de nombreux gestes à adopter ! Parce que{' '}
          <strong>les terminaux (ordinateurs, smartphones…) sont à l’origine de l’essentiel des impacts</strong> (de 65
          à 90 %) en particulier pour leur fabrication, vous pouvez agir en gardant le plus longtemps possible ces
          appareils ou en privilégiant les <strong>appareils reconditionnés</strong> plutôt que neufs. Eteindre vos
          appareils à la fin de chaque utilisation, limiter la très haute définition, faire du{' '}
          <strong>ménage dans votre cloud (photo, vidéo)</strong> comme dans vos mails sont d’autres axes pour diminuer
          votre empreinte numérique.
        </Text>
        <Text>
          Et pour aller plus loin, vous pouvez éteindre votre box internet la nuit et pendant vos absences, et surtout,
          limiter les objets connectés et <strong>recycler</strong> vos{' '}
          <strong>anciens équipements informatiques</strong>. En effet, la plupart des matériaux contenus dans les{' '}
          <strong>équipements numériques</strong> sont <strong>recyclables</strong> : quand ils ne peuvent pas être
          réparés, vos smartphones par exemple peuvent être en revanche recyclés jusqu’à 80 % !
        </Text>
        <Title>Comment va évoluer l'impact du numérique dans les prochaines années ?</Title>
        <Text>
          D’après une{' '}
          <Link href='https://www.arcep.fr/uploads/tx_gspublication/etude-numerique-environnement-ademe-arcep-note-synthese_janv2022.pdf'>
            étude ADEME – ARCEP
          </Link>
          , l’empreinte carbone du numérique pourrait augmenter de manière significative si rien n’est fait pour la
          limiter (+ 60 % d’ici à 2040 soit 6,7 % de l’empreinte carbone nationale). Quant aux objets connectés (comme
          les <Link href='/numerique/montreconnectee'>montres connectées</Link>
          ), ils risquent de représenter 18 à 23% de l’empreinte carbone d’ici 2025, contre 1% en 2020. Il est donc
          important de limiter son{' '}
          <strong>
            empreinte{' '}
            <Button asLink onClick={() => setOpenModal(true)}>
              CO<sub>2</sub>e
            </Button>
          </strong>{' '}
          .
        </Text>

        <Text>
          Si vous souhaitez aller plus loin dans votre démarche, vous pouvez calculer{' '}
          <strong>l&apos;ensemble de votre empreinte sur le climat</strong> grace à notre{' '}
          <Link href={'https://nosgestesclimat.fr/'}>simulateur Nos Gestes Climat</Link>
          <br />
          <br />
        </Text>
        <Link href={'https://nosgestesclimat.fr/'}>Découvrir Nos Gestes Climat</Link>
      </SectionWideContent>
    </StyledSection>
  )
}
