import classNames from 'classnames'
import styles from './Page.module.css'

const EcoConceptionPage = () => {
  return (
    <div className={classNames(styles.container, 'main-container')}>
      <h1>Éco-conception</h1>
      <h2>Introduction au principe d’éco-conception d’un service numérique</h2>
      <p>
        Un site éco-conçu est un site pensé pour être moins énergivore, plus respectueux de l’environnement et qui
        adopte une posture éthique sociétale.
      </p>
      <h2>Raison d’être du service</h2>
      <p>
        Nous veillons activement à limiter l’impact de notre propre site web et des ressources que l’on propose afin de
        porter les thématiques de sensibilisation écologique auprès d’un large public pour un impact limité.
      </p>
      <br />
      <p>
        Nous mesurons constamment l’impact de notre service, afin de nous assurer de la bonne performance de notre
        mission de sensibilisation.
      </p>
      <br />
      <p>
        Pour répondre aux exigences de l’éco-conception et limiter l’impact de notre site et de ses ressources, nous
        nous engageons à respecter les 3 axes suivants :
      </p>
      <br />
      <ul>
        <li>
          <b>Créer un site léger</b> (en termes de code mais également de visuels et de fonctionnalités) avec moins de
          besoin de stockage et de transfert de données. Le but est d’économiser l’énergie nécessaire pour faire
          fonctionner le site et d’allonger la durée de vie du matériel.
        </li>
        <br />
        <li>
          <b>Faciliter l’accès</b> à tous les utilisateurs en respectant les exigences d’accessibilité et de protection
          des données personnelles.
        </li>
        <br />
        <li>
          Fournir un <b>site internet utile et pérenne</b> avec une navigation facilitée et non intrusive et surtout un
          site facile à entretenir.
        </li>
      </ul>
      <h2>Score fruggr</h2>
      <p>
        Pour objectiver notre démarche, nous suivons la consommation de notre site Impact CO2 sur l’outil{' '}
        <a href='https://www.fruggr.io/fr/' target='_blank' rel='noreferrer noopener'>
          fruggr
        </a>
        , une solution qui évalue automatiquement l’impact du site.
      </p>
      <br />
      <p>
        L’outil fruggr nous donne la note de <b>87/100</b> au 12/12/2024.
      </p>
      <br />
      <p>Ce score représente l'impact du service sur les 3 domaines adressés par fruggr :</p>
      <br />
      <ul>
        <li>
          l'environnement (<b>79/100</b>)
        </li>
        <br />
        <li>
          le social (<b>92/100</b>)
        </li>
        <br />
        <li>
          et la sobriété (<b>91/100</b>)
        </li>
      </ul>
      <br />
      <p>
        L’Accélérateur de la Transition Écologique a fixé un objectif de 80/100 au minimum sur tous ses sites internet.
      </p>
      <h2>Exemples</h2>
      <p>
        Voici les scores portant sur les 3 axes (environnement, social, sobriété) ainsi que le poids en ko d’un
        échantillon de nos outils principaux :
      </p>
      <br />
      <ul>
        <li>Simulateur Transport : 86/100 - 713kB</li>
        <br />
        <li>Impact Alimentation : 85/100 - 724kB</li>
        <br />
        <li>Quiz Carbone : 87/100 - 718kB</li>
      </ul>
      <h2>Leviers d’amélioration</h2>
      <p>
        Dans une démarche d'amélioration continue nous nous efforçons de rendre le site Impact CO2 et ses ressources
        moins énergivores et plus respectueux de l'environnement.
      </p>
      <br />
      <p>Nous agissons sur les leviers suivants :</p>
      <br />
      <ul>
        <li>
          <b>Réduire le poids des pages </b> plus la page est lourde, plus le coût énergétique pour les calculs serveurs
          et l'usage du réseau sont élevés. Nous travaillons à la sensibilisation et à la formation de tous les
          contributeurs sur le web pour leur donner les bonnes pratiques sur le poids des médias et la pertinence à les
          utiliser.
        </li>
        <br />
        <li>
          <b>Améliorer l’accessibilité numérique </b> afin de rendre notre site accessible à tous, nous vérifions les
          critères RGAA (Référentiel général d'amélioration de l'accessibilité) pour tous les nouveaux éléments publiés
          sur Impact CO2.
        </li>
        <br />
        <li>
          <b>Réfléchir chaque nouveau composant du site pour qu’il soit le moins énergivore possible </b>
          les présentations animées sont très énergivores. Aussi, nous veillons à les utiliser avec parcimonie. Nous
          actionnons également des leviers sur le socle technique pour améliorer l’éco-conception d’Impact CO2.
        </li>
      </ul>
    </div>
  )
}

export default EcoConceptionPage
