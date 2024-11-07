'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import InfographySimulator from 'components/outils/equivalents/infographies/InfographySimulator'
import Icon from './Icon'
import styles from './Infos.module.css'

const AvocatPoisson = () => {
  const t = useTranslations('quiz.avocat-poisson')
  return (
    <>
      <div className={styles.container}>
        <div className={styles.withIcon}>
          <Icon />
          <div>
            <p>{t.rich('line-1')}</p>
            <p>{t.rich('line-2')}</p>
          </div>
        </div>
      </div>
      <InfographySimulator
        equivalents={['repasavecduboeuf', 'repasavecdupoissonblanc', 'repasvegetarien']}
        className={styles.borders}
      />
    </>
  )
}

export default AvocatPoisson
