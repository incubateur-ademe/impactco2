'use client'

import React from 'react'
import Link from 'components/base/buttons/Link'
import styles from './Data.module.css'

const TransportData = () => {
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
              La <b>construction des véhicules</b> (fabrication, maintenance et fin de vie){' '}
            </li>
            <li>
              La <b>production et distribution</b> de carburant et d'électricité
            </li>
          </ul>
        </div>
        <div> La construction des infrastructures (routes, rails, aéroports...) n'est pas incluse.</div>
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
              <b>Autocar</b> : 30 personnes - 35,2 gCO2e/km/personne ;
            </li>
            <li>
              <b>Bus thermique</b> : 10 personnes - 103 gCO2e/km/personne ;
            </li>
            <li>
              <b>Bus GNV</b> : 10 personnes - 113 gCO2e/km/personne ;
            </li>
            <li>
              <b>Avion</b> : taux de remplissage moyen par type de courrier (court, moyen, long).
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default TransportData
