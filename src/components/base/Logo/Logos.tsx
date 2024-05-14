import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { buildCurrentUrlFor } from 'utils/urls'
import Ademe from './Ademe'
import Logo from './ImpactCO2'
import styles from './Logos.module.css'
import Marianne from './Marianne'

const Logos = ({ small }: { small?: boolean }) => {
  return (
    <Link href={buildCurrentUrlFor('/')} className={classNames(styles.logos, { [styles.small]: small })}>
      <Marianne small={small} />
      <Ademe small={small} />
      <Logo small={small} />
    </Link>
  )
}

export default Logos