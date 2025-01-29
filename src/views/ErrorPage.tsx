import Link from 'components/base/buttons/Link'
import Block from 'components/layout/Block'
import styles from './ErrorPage.module.css'

const ErrorPage = () => {
  return (
    <div className='main-container'>
      <Block as='h1' title='Erreur inattendue' description='Erreur 500'>
        <p className={styles.bold}>
          Désolé, le service rencontre un problème, nous travaillons pour le résoudre le plus rapidement possible.
        </p>
        <p className={styles.text}>
          Essayez de rafraichir la page ou bien ressayez plus tard.
          <br />
          Si vous avez besoin d’une aide immédiate, merci de{' '}
          <Link href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>nous contacter</Link>.
        </p>
        <Link asButton href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>
          Nous contacter
        </Link>
      </Block>
    </div>
  )
}

export default ErrorPage
