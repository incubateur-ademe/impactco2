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
    <IframeableLink
      href={buildCurrentUrlFor('/')}
      className={classNames(styles.logos, { [styles.small]: small })}
      data-testid='impactco2-logos'>
      <Marianne small={small} />
      <Ademe small={small} />
      <Logo small={small} />
    </IframeableLink>
  )
}

export default Logos
