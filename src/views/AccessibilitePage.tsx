import classNames from 'classnames'
import Link from 'components/base/buttons/Link'
import styles from './Page.module.css'

const AccessibilitePage = () => {
  return (
    <div className={classNames(styles.container, 'main-container')}>
      <h1>Déclaration d'accessibilité</h1>
      <h2>Politique d’accessibilité</h2>
      <p>
        L’Agence de la transition écologique (ADEME) accorde une réelle importance à la qualité de réalisation et à
        l’expérience utilisateur de ses services numériques et s’engage à rendre ses sites internet, intranet, extranets
        accessibles conformément à l’article 47 de la loi n° 2005-102 du 11 février 2005.
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
      <br />
      <p>
        La présente déclaration d’accessibilité s’applique au site impact CO₂ ({process.env.NEXT_PUBLIC_URL}) dont toute
        l’équipe de conception et de développement est impliquée dans une approche globale de l’accessibilité.
      </p>
      <h2>État de conformité</h2>
      <p>
        Le site Impact CO₂ est « partiellement conforme » avec le Référentiel général d’amélioration de l’accessibilité,
        RGAA version 4.1, en raison des non-conformités énumérées dans la section « Résultats des tests ».
      </p>
      <h2>Résultats des tests</h2>
      <p>
        L’audit de conformité réalisé par la société Access42 révèle que le site est conforme à 79,03 % au RGAA version
        4.1.
      </p>
      <h2>Contenus inaccessibles</h2>
      <p>Les contenus listés ci-dessous ne sont pas accessibles pour les raisons suivantes.</p>
      <h3>Non-conformités</h3>
      <ul>
        <li>[1.6] Des images porteuses d’informations complexes nécessitent une description détaillée.</li>
        <li>[3.2] Des textes ont des contrastes insuffisants.</li>
        <li>
          [7.1] Des fonctionnalités JavaScript ne sont pas compatibles avec les technologies d’assistance (notamment des
          fenêtres modales, des contenus qui s’affichent et se masquent), ou font un usage inapproprié de propriétés
          ARIA.
        </li>
        <li>[7.5] Des messages de statut ne sont pas restitués par les technologies d’assistance.</li>
        <li>
          [8.9] Des pages font usage de balises à des fins de présentation (par exemple textes non structurés dans des
          balises de paragraphes).{' '}
        </li>
        <li>[9.2] La structure des pages est mal définie.</li>
        <li>[9.3] Des suites d’éléments ne sont pas structurées avec des listes.</li>
        <li>[10.7] Des indications visuelles de prise de focus ne sont pas suffisamment contrastées.</li>
        <li>[11.1] Des champs de formulaires n’ont pas d’étiquette correctement liée.</li>
        <li>[11.4] Certaines étiquettes ne sont pas accolées à leur champ.</li>
        <li>[11.5] Des champs de même nature ne sont pas regroupés.</li>
        <li>[13.3] Des documents PDF ne sont pas accessibles.</li>
      </ul>
      <h2>Établissement de cette déclaration d’accessibilité</h2>
      <p>Cette déclaration a été établie le 08 Octobre 2024. Elle a été mise à jour le 20 Février 2025</p>
      <h3>Technologies utilisées pour la réalisation du site</h3>
      <ul>
        <li>HTML5</li>
        <li>CSS</li>
        <li>Javascript (Next.js, React, Core.js)</li>
      </ul>
      <h3>Agents utilisateurs, technologies d’assistance et outils utilisés pour vérifier l’accessibilité</h3>
      <p>
        Les tests des pages web ont été effectués avec les combinaisons de navigateurs web et lecteurs d’écran
        suivants :
      </p>
      <ul>
        <li>Firefox 134.0 et NVDA NVDA 2024</li>
        <li>Firefox 134.0 et JAWS JAWS 2025</li>
        <li>Safari 18.2 et VoiceOver (macOS 15.2)</li>
        <li>Safari et VoiceOver (iOS 17.1.1)</li>
        <li>Chrome et TalkBack (Android 14)</li>
      </ul>
      <br />
      <p>
        La vérification de l’accessibilité est le résultat de tests manuels, assistés par des outils (feuilles CSS
        dédiés, extensions HeadingsMaps et WebDeveloper Toolbar, Color Contrast Analyser).
      </p>
      <h3>Pages du site ayant fait l’objet de la vérification de conformité</h3>
      <ul>
        <li>
          <Link href='/'> Accueil</Link>
        </li>
        <li>
          <Link href='/rendez-vous'>Contact</Link>
        </li>
        <li>
          <Link href='/mentions-legales'>Mentions légales</Link>
        </li>
        <li>
          <Link href='/accessibilite'>Accessibilité</Link>
        </li>
        <li>
          <Link href='/plan-du-site'>Plan du site</Link>
        </li>
        <li>
          <Link href='/doc/questions-frequentes'>Aide</Link>
        </li>
        <li>
          <Link href='/outils/comparateur'>Comparateur carbone</Link>
        </li>
        <li>
          <Link href='/outils/transport'>Transport</Link>
        </li>
        <li>
          <Link href='/outils/livraison'>Livraison</Link>
        </li>
        <li>
          <Link href='/outils/usagenumerique/visioconference'>Visioconférence</Link>
        </li>
        <li>
          <Link href='/doc/exemples'>Exemples d’utilisation</Link>
        </li>
        <li>
          <Link href='/contenu/detecteur-co2'>Le Détecteur CO₂</Link>
        </li>
        <li>
          <Link href='/budget'>Budget</Link>
        </li>
        <li>
          <Link href='/doc/usage-numerique/acv'>ACV</Link>
        </li>
      </ul>
      <h2>Retour d’information et contact</h2>
      <p>Il est important de rappeler qu’en vertu de l’article 11 de la loi de février 2005 :</p>
      <p>
        « la personne handicapée a droit à la compensation des conséquences de son handicap, quels que soient l’origine
        et la nature de sa déficience, son âge ou son mode de vie. »
      </p>
      <br />
      <p>
        L’ADEME s’engage à prendre les moyens nécessaires afin de donner accès, dans un délai raisonnable, aux
        informations et fonctionnalités recherchées par la personne handicapée, que le contenu fasse l’objet d’une
        dérogation ou non.
      </p>
      <br />
      <p>
        L’ADEME invite les personnes qui rencontreraient des difficultés à la contacter par courriel à{' '}
        <Link href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</Link>{' '}
        afin qu’une assistance puisse être apportée (alternative accessible, information et contenu donnés sous une
        autre forme).
      </p>
      <h2>Voies de recours</h2>
      <p>
        Si vous constatez un défaut d’accessibilité vous empêchant d’accéder à un contenu ou une fonctionnalité du site,
        que vous nous le signalez et que vous ne parvenez pas à obtenir une réponse rapide de notre part, vous êtes en
        droit de faire parvenir vos doléances ou une demande de saisine au Défenseur des droits.
      </p>
      <p>Plusieurs moyens sont à votre disposition :</p>
      <br />
      <ul>
        <li>
          <Link href='https://formulaire.defenseurdesdroits.fr/code/afficher.php?ETAPE=informations'>
            un formulaire de contact
          </Link>
        </li>
        <li>
          <Link href='https://www.defenseurdesdroits.fr/office/'>la liste des délégués de votre région</Link>
        </li>
        <li>un numéro de téléphone : 09 69 39 00 00 (coût d’un appel local)</li>
        <li>
          une adresse postale (courrier gratuit, ne pas mettre de timbre) : Le Défenseur des droits - Libre réponse
          71120 - 75342 Paris CEDEX 07
        </li>
      </ul>
    </div>
  )
}

export default AccessibilitePage
