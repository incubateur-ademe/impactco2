import classNames from 'classnames'
import { Stats } from 'utils/stats'
import Statistics from 'components/statistics/Statistics'
import styles from './Page.module.css'

const StatisticsPage = ({ stats, year }: { stats: Stats; year: string }) => {
  return (
    <div className={classNames(styles.container, 'main-container')}>
      <h1>Statistiques</h1>
      <Statistics defaultStats={stats} defaultYear={year} />
    </div>
  )
}

export default StatisticsPage
