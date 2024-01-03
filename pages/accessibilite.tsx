import React from 'react'
import styled from 'styled-components'
import { Section, SectionWideContent } from 'components/base/Section'
import Link from 'components/base/buttons/Link'
import Web from 'components/layout/Web'

const FormatText = styled.div`
  h1 {
    font-size: 3rem;
  }
  > h2 {
    margin-top: 3rem;
  }
`

export default function Accessibilite() {
  return (
    <Web title='Accessibilité'>
      <Section>
        <SectionWideContent>
          <FormatText>
            <h1>Déclaration d'accessibilité</h1>
            <h2 id='quest-ce-que-laccessibilité-numérique-'>Qu’est-ce que l’accessibilité numérique ?</h2>
            <p>
              Un site webBlue accessible est un site qui permet à tous les internautes d’accéder à ses contenus sans
              difficulté, y compris aux personnes qui présentent un handicap et utilisent des logiciels ou matériels
              spécialisés.
            </p>

            <h2 id='politique-daccessibilité'>Politique d’accessibilité</h2>
            <p>
              L’Agence de la transition écologique (ADEME) accorde une réelle importance à la qualité de réalisation et
              à l’expérience utilisateur de ses services numériques et s’engage à rendre ses sites internet, intranet,
              extranets accessibles conformément à l’article 47 de la loi n° 2005-102 du 11 février 2005.
            </p>

            <ul>
              <li>
                <Link href='https://librairie.ademe.fr/institutionnel/4817-schema-pluriannuel-de-mise-en-accessibilite-des-sites-webBlue-de-l-ademe-2021-2023.html'>
                  Schéma pluriannuel en cours
                </Link>
              </li>
              <li>
                <Link href='https://librairie.ademe.fr/institutionnel/6257-plan-annuel-de-mise-en-accessibilite-des-sites-webBlue-de-l-ademe.html'>
                  Plan d’action de l’année en cours
                </Link>
              </li>
            </ul>

            <p>
              La présente déclaration d’accessibilité s’applique au site impact CO<sub>2</sub> (
              {process.env.NEXT_PUBLIC_URL}) dont toute l’équipe de conception et de développement est impliquée dans
              une approche globale de l’accessibilité en attendant l’accompagnement par des experts tiers dans le cadre
              d’un futur audit du site.
            </p>

            <h2 id='état-de-conformité'>État de conformité</h2>

            <p>
              Le site Impact CO<sub>2</sub> est non conforme avec le Référentiel général d’amélioration de
              l’accessibilité, RGAA version 4.1, car il n’existe aucun résultat d’audit en cours de validité permettant
              de mesurer le respect de ces critères.
            </p>

            <h2 id='résultats-des-tests'>Résultats des tests</h2>

            <p>En l’absence d’audit de conformité il n’y a pas de résultats de tests.</p>

            <h2 id='contenus-non-accessibles'>Contenus non accessibles</h2>

            <p>Les contenus listés ci-dessous ne sont pas accessibles pour les raisons suivantes.</p>

            <p>
              <strong>Non-conformité</strong>
              <div>Néant</div>
            </p>
            <p>
              <strong>Dérogations pour charge disproportionnée</strong>
              <div>Néant</div>
            </p>
            <p>
              <strong>Contenus non soumis à l’obligation d’accessibilité</strong>
              <div>Néant</div>
            </p>

            <h2 id='établissement-de-cette-déclaration-daccessibilité'>
              Établissement de cette déclaration d’accessibilité
            </h2>
            <p>Cette déclaration a été établie le 26 juin 2023.</p>

            <h3 id='technologies-utilisées-pour-la-réalisation-du-site'>
              Technologies utilisées pour la réalisation du site
            </h3>
            <ul>
              <li>HTML5</li>
              <li>CSS</li>
              <li>Javascript</li>
            </ul>

            <h3 id='agents-utilisateurs-technologies-dassistance-et-outils-utilisés-pour-vérifier-laccessibilité'>
              Agents utilisateurs, technologies d’assistance et outils utilisés pour vérifier l’accessibilité
            </h3>
            <ul>
              <li>
                Les tests des pages webBlue ont été effectués avec les combinaisons de navigateurs webBlue et lecteurs
                d’écran suivants : Néant
              </li>
              <li>Les outils suivants ont été utilisés lors de l’évaluation : Néant</li>
              <li>Pages du site ayant fait l’objet de la vérification de conformité : Néant</li>
            </ul>

            <h2 id='retour-dinformation-et-contact'>Retour d’information et contact</h2>
            <p>
              L’ADEME s’engage à prendre les moyens nécessaires afin de donner accès, dans un délai raisonnable, aux
              informations et fonctionnalités recherchées par la personne handicapée, que le contenu fasse l’objet d’une
              dérogation ou non.
            </p>

            <p>
              L’ADEME invite les personnes qui rencontreraient des difficultés à la contacter par courriel à{' '}
              <Link href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
              </Link>{' '}
              afin qu’une assistance puisse être apportée (alternative accessible, information et contenu donnés sous
              une autre forme).
            </p>

            <h2 id='défenseur-des-droits'>Défenseur des droits</h2>
            <p>
              Si vous constatez un défaut d’accessibilité vous empêchant d’accéder à un contenu ou une fonctionnalité du
              site, que vous nous le signalez et que vous ne parvenez pas à obtenir une réponse rapide de notre part,
              vous êtes en droit de faire parvenir vos doléances ou une demande de saisine au Défenseur des droits.
            </p>
            <p>Plusieurs moyens sont à votre disposition :</p>
            <ul>
              <li>
                <Link href='https://formulaire.defenseurdesdroits.fr/code/afficher.php?ETAPE=accueil_2016'>
                  un formulaire de contact
                </Link>
              </li>
              <li>
                <Link href='https://www.defenseurdesdroits.fr/office/'>la liste des délégués de votre région</Link>
              </li>
              <li>un numéro de téléphone : 09 69 39 00 00 (coût d’un appel local)</li>
              <li>
                une adresse postale (courrier gratuit, ne pas mettre de timbre) : Le Défenseur des droits - Libre
                réponse 71120 - 75342 Paris CEDEX 07
              </li>
            </ul>
          </FormatText>
        </SectionWideContent>
      </Section>
    </Web>
  )
}
