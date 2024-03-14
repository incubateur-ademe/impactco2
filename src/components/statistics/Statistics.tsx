import classNames from 'classnames'
import React from 'react'
import { Stats } from 'utils/stats'
import Link from 'components/base/buttons/Link'
import styles from './Statistics.module.css'

const Statistics = ({ stats }: { stats: Stats }) => {
  return (
    <>
      <h2>En 2024 :</h2>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <div>
            <div className={styles.value}>
              <b>{(stats.visits + stats.iframes).toLocaleString()}</b>
            </div>
            Visites
            <div className={classNames(styles.description, 'text-sm')}>
              (Nombre de sessions sur le site https://impactco2.fr)
            </div>
          </div>
          <div>
            <div className={styles.value}>
              <b>{stats.iframes.toLocaleString()}</b>{' '}
            </div>
            Dont Iframes
            <div className={classNames(styles.description, 'text-sm')}>
              (Nombre de vues effectives d'un simulateur sur un autre site)
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div>
            <div className={styles.value}>
              <b>{stats.shared.toLocaleString()}</b>
            </div>
            Partages
            <div className={classNames(styles.description, 'text-sm')}>
              (Nombre de clicks sur le bouton "partager" d'un simulateur)
            </div>
          </div>
          <div>
            <div className={styles.value}>
              <b>{stats.screenshots.toLocaleString()}</b>
            </div>
            Screenshots
            <div className={classNames(styles.description, 'text-sm')}>
              (Nombre de clicks sur le bouton "télécharger" d'un simulateur)
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div>
            <div className={styles.value}>
              <b>{stats.api.toLocaleString()}</b>
            </div>
            Appels à l'API
            <div className={classNames(styles.description, 'text-sm')}>(Nombre d'appels externe à l'API)</div>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        Origine du traffic :
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <b>Site web</b>
              </th>
              <th>
                <b>Visites</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {stats.topUsers.map(({ label, visits }) => (
              <tr key={label}>
                <td>{label}</td>
                <td>
                  <b>{visits.toLocaleString()}</b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        priority='secondary'
        href={`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}/index.php?module=CoreHome&action=index&date=yesterday&period=week&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}#?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&period=week&date=yesterday&category=Dashboard_Dashboard&subcategory=6`}>
        Découvrez toutes les statistiques du site Impact CO<sub>2</sub> sur le tableau de bord de notre outil de suivi
        Matomo
      </Link>
    </>
  )
}

export default Statistics
