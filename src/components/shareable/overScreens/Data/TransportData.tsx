import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import Link from 'components/base/buttons/Link'
import styles from './Data.module.css'

const FRTransportData = () => {
  return (
    <>
      <div className={styles.title}>Méthodologie</div>
      <div className={styles.content}>
        <div>Les valeurs sont exprimées par personne en France et incluent :</div>
        <div>
          <ul>
            <li>
              Les <b>émissions directes</b>
            </li>
            <li>
              La <b>construction des véhicules</b> (fabrication, maintenance et fin de vie)
            </li>
            <li>
              La <b>production et distribution</b> de carburant et d'électricité
            </li>
          </ul>
        </div>
        <div>La construction des infrastructures (routes, rails, aéroports...) n'est pas incluse.</div>
        <div>
          Les facteurs d’émission utilisées pour calculer l’impact carbone des 17 modes de transport référencés sont
          issues de la <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>Base Empreinte de l’ADEME</Link>
          .
        </div>
        <div>
          La méthodologie de calcul est open source et accessible sur notre 
          <Link href='https://github.com/incubateur-ademe/impactco2'>repo GitHub</Link>.
        </div>
      </div>
      <div className={styles.title}>Taux de remplissage</div>
      <div className={styles.content}>
        <div>Nos hypothèses de calcul considèrent :</div>
        <div>
          <ul>
            <li>
              1 <b>seul passager pour une voiture</b> (thermique ou électrique).
            </li>
            <li>
              <b>Une moyenne des taux d’occupation</b> des différents modes de transport.
            </li>
          </ul>
        </div>
        <div>
          Pour les transports collectifs, les taux utilisés sont ceux de la{' '}
          <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>Base Empreinte</Link> :
        </div>
        <div>
          <ul>
            <li>
              <b>Autocar</b> : 30 personnes - 35,2 gCO₂e/km/personne ;
            </li>
            <li>
              <b>Bus thermique</b> : 10 personnes - 103 gCO₂e/km/personne ;
            </li>
            <li>
              <b>Bus GNV</b> : 10 personnes - 113 gCO₂e/km/personne ;
            </li>
            <li>
              <b>Avion</b> : taux de remplissage moyen par type de courrier (court, moyen, long).
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.title}>Covoiturage</div>
      <div className={styles.content}>
        <div>Par défaut nous comptons 1 seule personne, le conducteur, dans une voiture thermique ou électrique.</div>
        <div>
          Or nous sommes conscients que vous êtes de plus en plus nombreux à mutualiser vos trajets au sein de votre
          foyer ou à pratiquer le covoiturage, c’est pourquoi vous pouvez <b>comparer</b> l’impact d’un trajet
          individuel avec l’impact d’un trajet partagé avec 1, 2, 3, ou 4 passagers.
        </div>
      </div>
      <div className={styles.title}>Comparaison</div>
      <div className={styles.content}>
        <div>
          En comparant deux moyens de transports, évaluer <b>les économies de carbones</b> que réalisée sur une même
          distance donnée en fonction de toutes les hypothèses affichées ci-dessus.
        </div>
      </div>
      <div className={styles.content}>
        <div>
          Vous avez une question ? Vous souhaitez aller plus loin dans la compréhension ?{' '}
          <Link target='_blank' rel='noopener noreferrer' href='/doc/questions-frequentes'>
            Découvrez notre F.A.Q
          </Link>
        </div>
      </div>
    </>
  )
}

const ENTransportData = () => {
  return (
    <>
      <div className={styles.title}>Methodology</div>
      <div className={styles.content}>
        <div>The values ​​are expressed per person in France and include:</div>
        <div>
          <ul>
            <li>
              <b>Direct broadcasts</b>
            </li>
            <li>
              <b>Vehicle construction</b> (manufacturing, maintenance and end of life)
            </li>
            <li>
              <b>Production and distribution</b> of fuel and electricity
            </li>
          </ul>
        </div>
        <div>The construction of infrastructure (roads, rails, airports, etc.) is not included.</div>
        <div>
          The emission factors used to calculate the carbon impact of the 17 referenced modes of transport come from the{' '}
          <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>ADEME Footprint Base</Link>.
        </div>
        <div>
          The calculation methodology is open source and accessible on our
          <Link href='https://github.com/incubateur-ademe/impactco2'>Github repo</Link>.
        </div>
      </div>
      <div className={styles.title}>Filling rate</div>
      <div className={styles.content}>
        <div>Our calculation assumptions consider:</div>
        <div>
          <ul>
            <li>
              1 <b>passenger per car</b> (thermal or electric).
            </li>
            <li>
              <b>An average of occupancy rates</b> of different transport modes.
            </li>
          </ul>
        </div>
        <div>
          For public transport, the rates used are those of the{' '}
          <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>Base Empreinte</Link> :
        </div>
        <div>
          <ul>
            <li>
              <b>Coach</b> : 30 people - 35,2 gCO₂e/km/person ;
            </li>
            <li>
              <b>Thermal bus</b> : 10 people - 103 gCO₂e/km/person ;
            </li>
            <li>
              <b>Bus NGV</b> : 10 people - 113 gCO₂e/km/person ;
            </li>
            <li>
              <b>Airplane</b> : average occupancy rate by type of mail (short, medium, long).
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.title}>Carpooling</div>
      <div className={styles.content}>
        <div>By default we have only 1 person, the driver, in a thermal or electric car.</div>
        <div>
          However, we are aware that more and more of you are sharing your journeys within your household or carpooling,
          which is why you can <b>compare</b> the impact of an individual journey with the impact of a journey shared
          with 1, 2, 3, or 4 passengers.
        </div>
      </div>
      <div className={styles.title}>Comparison</div>
      <div className={styles.content}>
        <div>
          By comparing two means of transport, evaluate <b>the carbon savings</b> achieved over the same given distance
          based on all the hypotheses displayed above.
        </div>
      </div>
      <div className={styles.content}>
        <div>
          You have a question ? Do you want to go further in understanding?{' '}
          <Link target='_blank' rel='noopener noreferrer' href='/doc/questions-frequentes'>
            Discover our F.A.Q.
          </Link>
        </div>
      </div>
    </>
  )
}

const TransportData = () => {
  const { language } = useParamContext()
  if (language === 'en') {
    return <ENTransportData />
  }

  return <FRTransportData />
}
export default TransportData
