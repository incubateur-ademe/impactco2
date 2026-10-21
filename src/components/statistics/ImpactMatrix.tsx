import classNames from 'classnames'
import { ReactNode } from 'react'
import Link from '../base/buttons/Link'
import Card from '../cards/Card'
import styles from './ImpactMatrix.module.css'

const content: {
  title: string
  descriptions: {
    badge?: string
    badgeColor?: 'blue' | 'green'
    subtitle: string
    description: ReactNode
  }[]
}[] = [
  {
    title: 'Utilisable',
    descriptions: [
      {
        badge: 'RELAIS B2B',
        badgeColor: 'blue',
        subtitle: "Taux d'intégrations réalisées de manière autonome :",
        description: "55% des intégrations chez les relais réalisées sans prospection / intervention de l'équipe",
      },
    ],
  },
  {
    title: 'Utile',
    descriptions: [
      {
        badge: 'RELAIS B2B',
        badgeColor: 'blue',
        subtitle: 'Taux de satisfaction des relais :',
        description: '89% des utilisateurs l’ont jugé “utile” ou “indispensable”',
      },
    ],
  },
  {
    title: 'Efficience',
    descriptions: [
      {
        subtitle: "Budget sur l'année :",
        description: '640 000 euros',
      },
      {
        subtitle: 'Coût à la visite :',
        description: '640 000 / 4,4 M de visites par an = 0,14 euro par visite',
      },
    ],
  },
  {
    title: 'Utilisé',
    descriptions: [
      {
        badge: 'RELAIS B2B',
        badgeColor: 'blue',
        subtitle: 'Nombre de relais actifs :',
        description: '250 relais actifs, dont 127 ont > 1000 visites / mois sur l’outil intégré',
      },
      {
        subtitle: 'Part du trafic générée hors site ImpactCO2.fr :',
        description:
          '85% via les iFrames sur les sites relais (trafic généré sur nos outils sans budget d’acquisition BtoC)',
      },
      {
        subtitle: 'Nombre d’appels API :',
        description: '7,5 millions / an',
      },
      {
        badge: 'Citoyen(ne)S',
        badgeColor: 'green',
        subtitle: 'Nombre de consultations des outils (site + iFrames) :',
        description: '4,4 millions de visites / an',
      },
    ],
  },
  {
    title: 'Impactant',
    descriptions: [
      {
        badge: 'Citoyen(ne)S',
        badgeColor: 'green',
        subtitle:
          'Taux d’engagement avec les outils (clic, interaction, partage, téléchargement…) - top 3 des outils :',
        description: (
          <ul>
            <li>11% pour Impact Transport</li>
            <li>77% pour Usage numérique</li>
            <li>37% pour Impact Livraison</li>
          </ul>
        ),
      },
    ],
  },
]

const ImpactMatrix = () => {
  return (
    <div className={styles.text}>
      <p>
        Dans le cadre du programme <Link href='https://beta.gouv.fr/'>beta.gouv</Link>, les services publics numériques,
        comme Impact CO2 doivent mesurer leur usage, leur impact et leur efficience afin de garantir leur exemplarité et
        leur efficacité.
      </p>
      <br />
      <p>
        Pour mesurer l'usage et l'impact de nos produits, nous nous fixons des objectifs annuels et suivons
        mensuellement des résultats clés :
      </p>
      <ul className={styles.cards}>
        {content.map((card) => (
          <li className={styles.card} key={card.title}>
            <Card>
              <p className={styles.title}>{card.title}</p>
              <ul>
                {card.descriptions.map((description) => (
                  <li key={description.subtitle}>
                    {description.badge && description.badgeColor && (
                      <div className={classNames(styles.badge, styles[description.badgeColor])}>
                        {description.badge}
                      </div>
                    )}
                    <p className={styles.subtitle}>{description.subtitle}</p>
                    <p className={styles.description}>{description.description}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ul>
      <p>
        Vous pouvez également consulter <Link href='/stats'>nos statistiques d’usage</Link> pour suivre les performances
        sur l’année en cours et comparer avec les années précédentes.
      </p>
    </div>
  )
}

export default ImpactMatrix
