import React, { ReactNode } from 'react'
import Card from 'components/base/Card'
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
        <br />
        <br />
        <Card
          href={`/rendez-vous?from=${title}&fromLabel=${title}`}
          title='Obtenir un accompagnement'
          description='Vous avez besoin d’aide pour intégrer les ressources de notre site ou souhaitez obtenir des informations ?'
          link='Prendre rendez-vous'
          image='/images/envelop.png'
          trackingCategory={title}
          trackingAction='Blocs accompagnement'
        />
      </div>
    </>
  )
}

export default Contenu
