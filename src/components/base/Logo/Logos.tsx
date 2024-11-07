import classNames from 'classnames'
import React from 'react'
import { buildCurrentUrlFor } from 'utils/urls'
import IframeableLink from '../IframeableLink'
import Ademe from './Ademe'
import Logo from './ImpactCO2'
import styles from './Logos.module.css'
import Marianne from './Marianne'

const Logos = ({ small }: { small?: boolean }) => {
  return (
    <div className={classNames(styles.logos, { [styles.small]: small })}>
      <Marianne small={small} />
      <Ademe small={small} />
      <IframeableLink
        href={buildCurrentUrlFor('/')}
        className={styles.link}
        data-testid='impactco2-logos'
        title="Voir la page d'accueil du site Impact CO2">
        <Logo small={small} />
      </IframeableLink>
    </div>
  )
}

export default Logos
