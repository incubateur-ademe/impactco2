import { useGlobalStore } from 'src/providers/stores/global'
import Link from 'components/base/buttons/Link'
import styles from './Data.module.css'

const FRTransportData = () => {
  return (
    <>
      <h2 className={styles.title}>Méthodologie</h2>
      <div className={styles.content}>
        <p>Les valeurs sont exprimées par personne en France et incluent :</p>
        <div>
          <ul>
            <li>
              <p>
                Les <b>émissions directes</b>
              </p>
            </li>
            <li>
              <p>
                La <b>construction des véhicules</b> (fabrication, maintenance et fin de vie)
              </p>
            </li>
            <li>
              <p>
                La <b>production et distribution</b> de carburant et d'électricité
              </p>
            </li>
          </ul>
        </div>
        <p>La construction des infrastructures (routes, rails, aéroports...) n'est pas incluse.</p>
        <p>
          Les facteurs d’émission utilisées pour calculer l’impact carbone des 17 modes de transport référencés sont
          issues de la <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>Base Empreinte de l’ADEME</Link>
          .
        </p>
        <p>
          La méthodologie de calcul est open source et accessible sur notre 
          <Link href='https://github.com/incubateur-ademe/impactco2'>repo GitHub</Link>.
        </p>
      </div>
      <h2 className={styles.title}>Taux de remplissage</h2>
      <div className={styles.content}>
        <p>Nos hypothèses de calcul considèrent :</p>
        <div>
          <ul>
            <li>
              <p>
                1 <b>seul passager pour une voiture</b> (thermique ou électrique).
              </p>
            </li>
            <li>
              <p>
                <b>Une moyenne des taux d’occupation</b> des différents modes de transport.
              </p>
            </li>
          </ul>
        </div>
        <p>
          Pour les transports collectifs, les taux utilisés sont ceux de la{' '}
          <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>Base Empreinte</Link> :
        </p>
        <div>
          <ul>
            <li>
              <p>
                <b>Autocar</b> : 30 personnes - 35,2 gCO₂e/km/personne ;
              </p>
            </li>
            <li>
              <p>
                <b>Bus thermique</b> : 10 personnes - 103 gCO₂e/km/personne ;
              </p>
            </li>
            <li>
              <p>
                <b>Bus GNV</b> : 10 personnes - 113 gCO₂e/km/personne ;
              </p>
            </li>
            <li>
              <p>
                <b>Avion</b> : taux de remplissage moyen par type de courrier (court, moyen, long).
              </p>
            </li>
          </ul>
        </div>
      </div>
      <h2 className={styles.title}>Covoiturage</h2>
      <div className={styles.content}>
        <p>Par défaut nous comptons 1 seule personne, le conducteur, dans une voiture thermique ou électrique.</p>
        <p>
          Or nous sommes conscients que vous êtes de plus en plus nombreux à mutualiser vos trajets au sein de votre
          foyer ou à pratiquer le covoiturage, c’est pourquoi vous pouvez <b>comparer</b> l’impact d’un trajet
          individuel avec l’impact d’un trajet partagé avec 1, 2, 3, ou 4 passagers.
        </p>
      </div>
      <h2 className={styles.title}>Comparaison</h2>
      <div className={styles.content}>
        <p>
          En comparant deux moyens de transports, évaluer <b>les économies de carbones</b> que réalisée sur une même
          distance donnée en fonction de toutes les hypothèses affichées ci-dessus.
        </p>
      </div>
      <div className={styles.content}>
        <p>
          Vous avez une question ? Vous souhaitez aller plus loin dans la compréhension ?{' '}
          <Link target='_blank' rel='noopener noreferrer' href='/doc/questions-frequentes'>
            Découvrez notre F.A.Q
          </Link>
        </p>
      </div>
    </>
  )
}
const ESTransportData = () => {
  return (
    <>
      <h2 className={styles.title}>Metodología</h2>
      <div className={styles.content}>
        <p>Los valores se expresan por persona en Francia e incluyen :</p>
        <div>
          <ul>
            <li>
              <p>
                <b>Emisiones directas</b>
              </p>
            </li>
            <li>
              <p>
                <b>Construcción de vehículos</b> (fabricación, mantenimiento y fin de v)
              </p>
            </li>
            <li>
              <p>
                <b>Producción y distribución</b> de combustible y electricidad
              </p>
            </li>
          </ul>
        </div>
        <p>No se incluye la construcción de infraestructuras (carreteras, ferrocarriles, aeropuertos, etc.).</p>
        <p>
          Los factores de emisión utilizados para calcular el impacto del carbono de los 17 modos de transporte
          enumerados proceden de la{' '}
          <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>base de datos Empreinte de ADEME</Link>.
        </p>
        <p>
          La metodología de cálculo es de código abierto y está accesible en nuestro{' '}
          <Link href='https://github.com/incubateur-ademe/impactco2'>repositorio de GitHub</Link>.
        </p>
      </div>
      <h2 className={styles.title}>Tasa de llenado</h2>
      <div className={styles.content}>
        <p>Nuestras hipótesis de cálculo consideran :</p>
        <div>
          <ul>
            <li>
              <p>
                1 <b>único pasajero por coche</b> (térmico o eléctrico).
              </p>
            </li>
            <li>
              <p>
                <b>Una media de las tasas de ocupación</b> de los distintos modos de transporte.
              </p>
            </li>
          </ul>
        </div>
        <p>
          Para el transporte público, las tasas utilizadas son las de la{' '}
          <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>base de datos Empreinte</Link> :
        </p>
        <div>
          <ul>
            <li>
              <p>
                <b>Autocar</b> : 30 personas - 35,2 gCO₂e/km/persona ;
              </p>
            </li>
            <li>
              <p>
                <b>Autobús térmico</b> : 10 personas - 103 gCO₂e/km/persona ;
              </p>
            </li>
            <li>
              <p>
                <b>Autobús GNV</b> : 10 personas - 113 gCO₂e/km/persona ;
              </p>
            </li>
            <li>
              <p>
                <b>Avión</b> : factor de carga medio por tipo de correo (corto, medio, largo).
              </p>
            </li>
          </ul>
        </div>
      </div>
      <h2 className={styles.title}>Compartir coche</h2>
      <div className={styles.content}>
        <p>Por defecto sólo contabilizamos 1 persona, el conductor, en un coche de combustión o eléctrico.</p>
        <p>
          Sin embargo, somos conscientes de que cada vez son más los que comparten sus viajes dentro de su hogar o
          comparten coche, por lo que puede comparar el impacto de un viaje individual con el impacto de un viaje
          compartido con 1, 2, 3 o 4 pasajeros.
        </p>
      </div>
      <h2 className={styles.title}>Comparación</h2>
      <div className={styles.content}>
        <p>
          Comparando dos medios de transporte, calcula <b>el ahorro de carbono</b> para una distancia determinada,
          basándote en todos los supuestos anteriores.
        </p>
      </div>
      <div className={styles.content}>
        <p>
          ¿Tienes alguna pregunta? ¿Quieres saber más?{' '}
          <Link target='_blank' rel='noopener noreferrer' href='/doc/questions-frequentes'>
            Echa un vistazo a nuestras F.A.Q.
          </Link>
        </p>
      </div>
    </>
  )
}

const ENTransportData = () => {
  return (
    <>
      <h2 className={styles.title}>Methodology</h2>
      <div className={styles.content}>
        <p>The values ​​are expressed per person in France and include:</p>
        <div>
          <ul>
            <li>
              <p>
                <b>Direct broadcasts</b>
              </p>
            </li>
            <li>
              <p>
                <b>Vehicle construction</b> (manufacturing, maintenance and end of life)
              </p>
            </li>
            <li>
              <p>
                <b>Production and distribution</b> of fuel and electricity
              </p>
            </li>
          </ul>
        </div>
        <div>The construction of infrastructure (roads, rails, airports, etc.) is not included.</div>
        <p>
          The emission factors used to calculate the carbon impact of the 17 referenced modes of transport come from the{' '}
          <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>ADEME Footprint Base</Link>.
        </p>
        <p>
          The calculation methodology is open source and accessible on our
          <Link href='https://github.com/incubateur-ademe/impactco2'>Github repo</Link>.
        </p>
      </div>
      <h2 className={styles.title}>Filling rate</h2>
      <div className={styles.content}>
        <p>Our calculation assumptions consider:</p>
        <div>
          <ul>
            <li>
              <p>
                1 <b>passenger per car</b> (thermal or electric).
              </p>
            </li>
            <li>
              <p>
                <b>An average of occupancy rates</b> of different transport modes.
              </p>
            </li>
          </ul>
        </div>
        <p>
          For public transport, the rates used are those of the{' '}
          <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>Base Empreinte</Link> :
        </p>
        <div>
          <ul>
            <li>
              <p>
                <b>Coach</b> : 30 people - 35,2 gCO₂e/km/person ;
              </p>
            </li>
            <li>
              <p>
                <b>Thermal bus</b> : 10 people - 103 gCO₂e/km/person ;
              </p>
            </li>
            <li>
              <p>
                <b>Bus NGV</b> : 10 people - 113 gCO₂e/km/person ;
              </p>
            </li>
            <li>
              <p>
                <b>Airplane</b> : average occupancy rate by type of mail (short, medium, long).
              </p>
            </li>
          </ul>
        </div>
      </div>
      <h2 className={styles.title}>Carpooling</h2>
      <div className={styles.content}>
        <p>By default we have only 1 person, the driver, in a thermal or electric car.</p>
        <p>
          However, we are aware that more and more of you are sharing your journeys within your household or carpooling,
          which is why you can <b>compare</b> the impact of an individual journey with the impact of a journey shared
          with 1, 2, 3, or 4 passengers.
        </p>
      </div>
      <h2 className={styles.title}>Comparison</h2>
      <div className={styles.content}>
        <p>
          By comparing two means of transport, evaluate <b>the carbon savings</b> achieved over the same given distance
          based on all the hypotheses displayed above.
        </p>
      </div>
      <div className={styles.content}>
        <p>
          You have a question ? Do you want to go further in understanding?{' '}
          <Link target='_blank' rel='noopener noreferrer' href='/doc/questions-frequentes'>
            Discover our F.A.Q.
          </Link>
        </p>
      </div>
    </>
  )
}

const TransportData = () => {
  const { language } = useGlobalStore()
  if (language === 'en') {
    return <ENTransportData />
  }
  if (language === 'es') {
    return <ESTransportData />
  }

  return <FRTransportData />
}
export default TransportData
