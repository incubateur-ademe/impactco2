import classNames from 'classnames'
import { buildCurrentUrlFor } from 'utils/urls'
import Link from '../buttons/Link'
import Ademe from './Ademe'
import Logo from './ImpactCO2'
import Marianne from './Marianne'
import styles from './Logos.module.css'

const Logos = ({ small }: { small?: boolean }) => {
  return (
    <div className={classNames(styles.logos, { [styles.small]: small })}>
      <Marianne small={small} />
      <Ademe small={small} />
      <Link
        href={buildCurrentUrlFor('/')}
        className={styles.link}
        data-testid='impactco2-logos'
        internal
        title="Voir la page d'accueil du site Impact CO2">
        <Logo small={small} />
      </Link>
    </div>
  )
}

export default Logos
