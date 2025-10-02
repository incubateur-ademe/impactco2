import DetectorInformation from 'components/outils/DetectorInformation'
import DetectorScript from 'components/outils/DetectorScript'

export const tools = [
  {
    slug: 'rse',
    title: 'Kit RSE',
    description: 'La ressource clé en main pour sensibiliser à la transition écologique',
    linkLabel: 'Obtenir',
    link: 'https://tally.so/r/3yBzV6',
  },
  {
    slug: 'livraison',
    title: 'Livraison',
    description: 'Simuler l’impact carbone de vos livraisons de colis',
    linkLabel: 'Découvrir',
  },
  {
    slug: 'transport',
    title: 'Transport',
    description: 'Calculer l’impact carbone des moyens de transport',
    linkLabel: 'Essayer',
  },
  {
    slug: 'alimentation',
    title: 'Alimentation',
    description: 'Comparer l’empreinte carbone des aliments',
    linkLabel: 'Découvrir',
  },
  {
    slug: 'comparateur',
    title: 'Comparateur',
    description: 'Le bon outil pour obtenir les bons ordres de grandeur',
    linkLabel: 'Visualiser',
  },
  {
    slug: 'fruitsetlegumes',
    title: 'Fruits et légumes',
    description: 'Découvrir les fruits et légumes de la saison et leur impact carbone',
    linkLabel: 'Visualiser',
  },
  {
    slug: 'chauffage',
    title: 'Chauffage',
    description: 'Situer l’empreinte carbone des modes de chauffage',
    linkLabel: 'Calculer',
  },
  {
    slug: 'mobilier',
    title: 'Mobilier',
    description: 'Comparer l’impact carbone du mobilier',
    linkLabel: 'Visualiser',
  },
  {
    slug: 'repas',
    title: 'Repas',
    link: '/outils/alimentation#repas',
    description: 'Comparer l’empreinte carbone des différents types de repas',
    linkLabel: 'Découvrir',
  },
  {
    slug: 'electromenager',
    title: 'Électroménager',
    description: 'Comparer l’impact carbone des appareils ménagers',
    linkLabel: 'Comparer',
  },
  {
    slug: 'habillement',
    title: 'Habillement',
    description: 'Comparer l’impact carbone des vêtements entre eux',
    linkLabel: 'Découvrir',
  },
  {
    slug: 'numerique',
    title: 'Numérique',
    description: 'Mesurer l’impact carbone des appareils numériques',
    linkLabel: 'Comparer',
  },
  {
    slug: 'boisson',
    title: 'Boisson',
    description: 'Comparer l’impact carbone des boissons',
    linkLabel: 'Comparer',
  },
  {
    slug: 'usagenumerique',
    title: 'Usage numérique',
    description: 'Évaluer l’impact carbone des usages numériques',
    linkLabel: 'Visualiser',
  },
  {
    slug: 'teletravail',
    title: 'Télétravail',
    description: 'Mesurer les économies de carbone réalisées grâce au télétravail',
    linkLabel: 'Visualiser',
  },
]

export const quiz = {
  slug: 'quiz',
  title: 'Quiz carbone',
  description: 'Un format interactif pour sensibiliser et apprendre de façon ludique.',
  linkLabel: 'Jouer',
}

export const smallTools = [
  {
    slug: 'etiquettes',
    title: 'Étiquettes',
    description: 'Le petit format pour communiquer les bons ordres de grandeur.',
    meta: "Découvrir l'étiquette CO2, le petit format pour communiquer les bons ordres de grandeur",
    linkLabel: 'Découvrir',
    content: (
      <>
        <p>
          Dans le prolongement du comparateur carbone, Impact CO₂ propose désormais une version compacte et facilement
          configurable : l'étiquette carbone.
        </p>
        <p>
          Elle permet de visualiser rapidement le poids carbone associé à des gestes et objets du quotidien et de les
          comparer entre eux, dans un format mini, idéal pour une communication percutante et ludique des ordres de
          grandeur.
        </p>
        <p>
          <b>
            Les étiquettes sont créées automatiquement lorsque vous utilisez le comparateur carbone, juste en dessous de
            ce dernier.
          </b>{' '}
          En faisant défiler la page du comparateur, vous pouvez retrouver votre comparaison au format étiquette et
          l’utiliser dans vos contenus et applications.
        </p>
      </>
    ),
    toolLink: '/outils/comparateur#etiquette',
    toolLinkLabel: 'Créer mon étiquette avec le comparateur carbone',
  },
  {
    slug: 'detecteur',
    title: 'Détecteur CO₂',
    description: 'L’outil innovant pour mettre en lumière vos données carbone.',
    meta: 'Valoriser et mieux faire comprendre les données carbones grâce au détecteur CO2 qui communique les bons ordres de grandeur',
    linkLabel: 'Découvrir',
    content: <DetectorInformation />,
    script: <DetectorScript />,
  },
]

export const devTools = [
  {
    slug: 'api',
    title: 'API',
    description: 'Accéder facilement et gratuitement à des données carbone fiables.',
    linkLabel: 'Découvrir',
    content: (
      <>
        <p>
          Grâce à L’API Impact CO₂, vous pouvez accéder aux données carbone utilisées sur Impact CO₂ et dans toutes les
          ressources du site.
        </p>
        <p>
          Gratuite, personnalisable, et régulièrement mise à jour elle vous permet de vous emparer facilement des
          informations essentielles sur les émissions carbones de + de 200 objets et gestes du quotidien, et de les
          intégrer dans vos propres applications et contenus.
        </p>
        <p>
          Comme toute API, sa documentation s’adresse principalement aux développeurs. Nous vous conseillons ainsi de la
          partager avec votre équipe technique afin d’explorer les possibilités d’intégration au sein de vos contenus et
          applications.
        </p>
      </>
    ),
    toolLink: '/doc/api',
    toolLinkLabel: 'Accéder à la documentation de l’API',
  },
  {
    slug: 'npm',
    title: 'Package NPM',
    description: "Pour faciliter l'intégration de l’étiquette carbone.",
    meta: 'Intégrer facilement l’étiquette carbone d’Impact CO2 dans son contenu grâce au package npm, un format destiné aux développeurs',
    linkLabel: 'Découvrir',
    content: (
      <>
        <p>
          Impact CO₂ a développé à destination des développeurs des packages npm pour l’étiquette carbone, permettant
          d'intégrer facilement cette ressource dans le code source de leurs applications ou sites web.
        </p>
        <p>
          Cette solution simplifie et accélère l'intégration de notre outil pour tous les relais désireux de l'héberger
          sur leur site ou application native.
        </p>
      </>
    ),
    toolLink: 'https://www.npmjs.com/package/@incubateur-ademe/impactco2-react',
    toolLinkLabel: 'Accéder au package NPM',
  },
]
