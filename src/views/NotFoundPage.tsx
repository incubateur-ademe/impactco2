import React from 'react'
import Link from 'components/base/buttons/Link'
import Block from 'components/layout/Block'
import styles from './ErrorPage.module.css'

const NotFoundPage = () => {
  return (
    <div className='main-container'>
      <Block as='h1' title='Page non trouvée' description='Erreur 404'>
        <div className={styles.bold}>
          La page que vous cherchez est introuvable. Excusez-nous pour la gêne occasionnée.
        </div>
        <div className={styles.text}>
          Si vous avez tapé l’adresse web dans le navigateur, vérifiez qu’elle est correcte. La page n’est peut-être
          plus disponible.
          <br />
          <br />
          Dans ce cas, pour continuer votre visite vous pouvez consulter notre <Link href='/'>page d’accueil</Link>,
          sinon vous pouvez <Link href='/rendez-vous?fromLabel=404'>nous contacter</Link> pour que l’on puisse vous
          rediriger vers la bonne information.
        </div>
        <Link asButton href='/'>
          Page d'acceuil
        </Link>
      </Block>
    </div>
  )
}

export default NotFoundPage
