import classNames from 'classnames'
import React from 'react'
import { Stats } from 'utils/stats'
import Statistics from 'components/statistics/Statistics'
import styles from './Page.module.css'

const StatisticsPage = ({ stats }: { stats: Stats }) => {
  return (
    <div className={classNames(styles.container, 'main-container')}>
      <h1>Statistiques</h1>
      <Statistics stats={stats} />
    </div>
  )
}

export default StatisticsPage
