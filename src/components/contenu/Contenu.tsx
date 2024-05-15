import React, { ReactNode } from 'react'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import styles from './Contenu.module.css'

const Contenu = ({
  children,
  title,
  previous,
}: {
  children: ReactNode
  title: string
  previous?: { link: string; label: string }
}) => {
  return (
    <>
      <div className={styles.background} />
      <div className={styles.content}>
        <div className={styles.breadcrumbs}>
          <Breadcrumbs links={[{ link: '/', label: 'Accueil' }].concat(previous || [])} current={title} />
        </div>
        {children}
      </div>
    </>
  )
}

export default Contenu
