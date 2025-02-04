'use client'

import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { Stats, getMatomoStats } from 'utils/stats'
import LocalNumber from 'components/base/LocalNumber'
import Link from 'components/base/buttons/Link'
import HiddenLabel from 'components/form/HiddenLabel'
import Select from 'components/form/Select'
import styles from './Statistics.module.css'

const Statistics = ({ defaultStats, defaultYear }: { defaultStats: Stats; defaultYear: string }) => {
  const [year, setYear] = useState(defaultYear)
  const [stats, setStats] = useState(defaultStats)

  const mountRef = useRef(false)

  useEffect(() => {
    if (mountRef.current) {
      getMatomoStats(year).then(setStats)
    } else {
      mountRef.current = true
    }
  }, [year])

  return (
    <>
      <div className={styles.title}>
        En <HiddenLabel htmlFor='select-year'>Année des statistiques</HiddenLabel>
        <Select value={year} id='select-year' onChange={(e) => setYear(e.target.value)} className={styles.select}>
          <option value='2024'>2024</option>
          <option value='2025'>2025</option>
        </Select>
         :
      </div>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <div>
            <div className={styles.value}>
              <b>
                <LocalNumber number={stats.visits + stats.iframes} />
              </b>
            </div>
            Visites
            <div className={classNames(styles.description, 'text-sm')}>
              (Nombre de sessions sur le site https://impactco2.fr)
            </div>
          </div>
          <div>
            <div className={styles.value}>
              <b>
                <LocalNumber number={stats.iframes} />
              </b>{' '}
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
              <b>
                <LocalNumber number={stats.shared} />
              </b>
            </div>
            Partages
            <div className={classNames(styles.description, 'text-sm')}>
              (Nombre de clicks sur le bouton "partager" d'un simulateur)
            </div>
          </div>
          <div>
            <div className={styles.value}>
              <b>
                <LocalNumber number={stats.screenshots} />
              </b>
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
              <b>
                <LocalNumber number={stats.api} />
              </b>
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
                  <b>
                    <LocalNumber number={visits} />
                  </b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        href={`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}/index.php?module=CoreHome&action=index&date=yesterday&period=week&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}#?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&period=week&date=yesterday&category=Dashboard_Dashboard&subcategory=6`}>
        Découvrez toutes les statistiques du site Impact CO₂ sur le tableau de bord de notre outil de suivi Matomo
      </Link>
    </>
  )
}

export default Statistics
